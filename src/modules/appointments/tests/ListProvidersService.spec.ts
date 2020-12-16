import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers without user logged', async () => {
    const userOne = await fakeUsersRepository.create({
      name: 'John One',
      email: 'johnone@test.com',
      password: '123456',
    });

    const userTwo = await fakeUsersRepository.create({
      name: 'John Two',
      email: 'johntwo@test.com',
      password: '123456',
    });

    const userThree = await fakeUsersRepository.create({
      name: 'John Three',
      email: 'johnthree@test.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Logged',
      email: 'johndoe@test.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([userOne, userTwo, userThree]);
    expect(providers).not.toContain(loggedUser);
  });
});
