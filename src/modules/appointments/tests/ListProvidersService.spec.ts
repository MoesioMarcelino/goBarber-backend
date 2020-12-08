import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
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
