import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/Users';

import UsersRepositoryInterface from '../repositories/UsersRepositoryInterface';

interface Request {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,
  ) {}

  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    // Apaga o avatar já existente
    if (user.avatar) {
      // Monta o camihho onde o arquivo está salvo
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      // Verifica se ele existe mesmo
      const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

      // Se ele existir
      if (userAvatarExists) {
        // Remove o arquivo do path
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
