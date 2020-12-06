import { inject, injectable } from 'tsyringe';
import { isAfter, addHours, differenceInHours } from 'date-fns';

// import AppError from '@shared/errors/AppError';

import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';
import UserTokensRepositoryInterface from '@modules/users/repositories/UserTokenRepositoryInterface';
import HashProviderInterface from '@modules/users/providers/HashProviders/models/HashProviderInterface';

import AppError from '@shared/errors/AppError';

interface Request {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRespository')
    private usersRepository: UsersRepositoryInterface,

    @inject('UserTokensRepository')
    private userTokensRepository: UserTokensRepositoryInterface,

    @inject('HashProvider')
    private hashProvider: HashProviderInterface,
  ) {}

  public async execute({ token, password }: Request): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const { created_at } = userToken;

    if (differenceInHours(new Date(Date.now()), new Date(created_at)) > 2) {
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
