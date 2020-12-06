import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import auth from '@config/auth';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/Users';
import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';
import HashProviderInterface from '@modules/users/providers/HashProviders/models/HashProviderInterface';

interface Request {
  email: string;
  password: string;
}

interface Response {
  userAuthenticated: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,

    @inject('HashProvider')
    private hashProvider: HashProviderInterface,
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // user.password - senha criptografada salvada no banco
    // password - senha que o usuário está mandando sem estar criptografada

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = auth;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      userAuthenticated: user,
      token,
    };
  }
}

export default AuthenticateUserService;
