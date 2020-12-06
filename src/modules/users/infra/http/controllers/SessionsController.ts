import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { userAuthenticated, token } = await authenticateUser.execute({
      email,
      password,
    });

    const {
      id,
      name,
      email: emailUser,
      created_at,
      updated_at,
    } = userAuthenticated;

    const user = {
      id,
      name,
      email: emailUser,
      created_at,
      updated_at,
    };

    return res.send({ user, token });
  }
}
