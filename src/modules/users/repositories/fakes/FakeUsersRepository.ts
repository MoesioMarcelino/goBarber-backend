import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';
import CreateAppointmentDTO from '@modules/users/dtos/CreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/Users';
import { uuid } from 'uuidv4';
import FindAllProvidersDTO from '@modules/users/dtos/FindAllProvidersDTO';

class UsersRepository implements UsersRepositoryInterface {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async create(userData: CreateAppointmentDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), ...userData });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async findAllProviders({
    expect_user_id,
  }: FindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    if (expect_user_id) {
      users = this.users.filter(user => user.id !== expect_user_id);
    }

    return users;
  }

  public async findAllUsers(): Promise<User[]> {
    return this.users;
  }
}

export default UsersRepository;
