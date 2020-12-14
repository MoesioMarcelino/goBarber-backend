import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListUsersService from '../services/ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let listUsers: ListUsersService;

describe('ListUsersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listUsers = new ListUsersService(fakeUsersRepository);
  });

  it('should be able to list all users', async () => {
    const userOne = await fakeUsersRepository.create({
      name: 'user-one',
      email: 'userone@test.com',
      password: '123456',
    });

    const userTwo = await fakeUsersRepository.create({
      name: 'user-two',
      email: 'usertwo@test.com',
      password: '123456',
    });

    const users = await listUsers.execute();

    expect(users).toHaveLength(2);
    expect(users).toEqual(expect.arrayContaining([userOne, userTwo]));
  });
});
