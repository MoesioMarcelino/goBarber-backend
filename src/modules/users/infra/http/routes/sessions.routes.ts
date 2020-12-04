import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
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
});

export default sessionsRouter;
