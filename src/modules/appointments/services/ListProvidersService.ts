import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/Users';

import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';

interface Request {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      expect_user_id: user_id,
    });

    return users;
  }
}

export default ListProvidersService;
