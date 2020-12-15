import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import FakeBCryptHashProvider from '../providers/HashProviders/fakes/FakeBCryptHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeBCryptHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeBCryptHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Updated',
      email: 'johnupdated@test.com',
    });

    expect(updatedUser.name).toBe('John Updated');
    expect(updatedUser.email).toBe('johnupdated@test.com');
  });

  it('should not be able to change to already existing email', async () => {
    await fakeUsersRepository.create({
      name: 'John One',
      email: 'johnone@test.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Two',
      email: 'johntwo@test.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Three',
        email: 'johnone@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John One',
      email: 'johnone@test.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John One',
      email: 'johnone@test.com',
      old_password: '123456',
      password: '111222',
    });

    expect(updatedUser.password).toBe('111222');
  });

  it('should be able only update the password, passing old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John One',
      email: 'johnone@test.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John One',
        email: 'johnone@test.com',
        password: '111222',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the password with an wrong password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John One',
      email: 'johnone@test.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John One',
        email: 'johnone@test.com',
        old_password: 'wrong-old-password',
        password: '111222',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a non-existig user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-profile',
        name: 'John Doe',
        email: 'johndoe@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
