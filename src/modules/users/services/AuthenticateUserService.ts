import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import auth from '@config/auth';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/Users';

import UsersRepositoryInterface from '../repositories/UsersRepositoryInterface';

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
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    // user.password - senha criptografada salvada no banco
    // password - senha que o usuário está mandando sem estar criptografada

    const passwordMatched = await compare(password, user.password);

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
