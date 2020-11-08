import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const authenticateUser = new AuthenticateUserService();

  const { userAuthenticated, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete userAuthenticated.password;

  return res.send({ userAuthenticated, token });
});

export default sessionsRouter;
