import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { userAuthenticated, token } = await authenticateUser.execute({
      email,
      password,
    });

    return res.send({ user: classToClass(userAuthenticated), token });
  }
}
