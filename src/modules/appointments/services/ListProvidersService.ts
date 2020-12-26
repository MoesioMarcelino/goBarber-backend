import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/Users';

import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';
import CacheProviderInterface from '@shared/container/providers/CacheProvider/models/CacheProviderInterface';
import { classToClass } from 'class-transformer';

interface Request {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,

    @inject('CacheProvider')
    private cacheProvider: CacheProviderInterface,
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        expect_user_id: user_id,
      });

      await this.cacheProvider.save(
        `providers-list:${user_id}`,
        classToClass(users),
      );
    }

    return users;
  }
}

export default ListProvidersService;
