import User from '@modules/users/infra/typeorm/entities/Users';

import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import FindAllProvidersDTO from '@modules/users/dtos/FindAllProvidersDTO';

export default interface UsersRepositoryInterface {
  findAllUsers(): Promise<User[]>;
  findAllProviders(except_user_id: FindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: CreateUserDTO): Promise<User>;
  save(uver: User): Promise<User>;
}
