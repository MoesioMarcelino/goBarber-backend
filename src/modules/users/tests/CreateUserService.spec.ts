import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeBCryptHashProvider from '@modules/users/providers/HashProviders/fakes/FakeBCryptHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeBCryptHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeBCryptHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a user with a email repetead', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
