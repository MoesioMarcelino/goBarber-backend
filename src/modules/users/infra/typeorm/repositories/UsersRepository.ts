import { getRepository, Repository } from 'typeorm';

import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';
import CreateAppointmentDTO from '@modules/users/dtos/CreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/Users';

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
}

export default UsersRepository;
