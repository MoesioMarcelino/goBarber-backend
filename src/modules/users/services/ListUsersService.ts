import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/Users';
import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
  ) {}

  async execute(): Promise<User[]> {
    const users = this.usersRepository.findAllUsers();

    return users;
  }
}

export default ListUsersService;
