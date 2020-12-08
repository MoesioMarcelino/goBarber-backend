import { getRepository, Not, Repository } from 'typeorm';

import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';
import CreateAppointmentDTO from '@modules/users/dtos/CreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/Users';
import FindAllProvidersDTO from '@modules/users/dtos/FindAllProvidersDTO';

class UsersRepository implements UsersRepositoryInterface {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async create(userData: CreateAppointmentDTO): Promise<User> {
    const appointment = this.ormRepository.create(userData);

    await this.save(appointment);

    return appointment;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findAllProviders({
    expect_user_id,
  }: FindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if (expect_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(expect_user_id),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async findAllUsers(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }
}

export default UsersRepository;
