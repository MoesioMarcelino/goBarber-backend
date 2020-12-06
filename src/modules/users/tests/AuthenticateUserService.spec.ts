import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeBCryptHashProvider from '@modules/users/providers/HashProviders/fakes/FakeBCryptHashProvider';

import CreateUserService from '@modules/users/services/CreateUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeBCryptHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeBCryptHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate an existing user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@test.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.userAuthenticated).toEqual(user);
  });

  it('should not be able to authenticate a non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@test.com',
        password: '123451',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an existing user with a wrong password/email', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe1@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      authenticateUser.execute({
        email: 'johndoe@test.com',
        password: '1234561',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
