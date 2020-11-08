import fs from 'fs';
import path from 'path';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';
import User from '../models/Users';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

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

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
