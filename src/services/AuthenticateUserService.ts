import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import auth from '../config/auth';
import AppError from '../errors/AppError';
import User from '../models/Users';

interface Request {
  email: string;
  password: string;
}

interface Response {
  userAuthenticated: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

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
