import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ProfileController from '../controllers/ProifleController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string().min(6),
      password: Joi.string().min(6),
      password_confirmation: Joi.string().min(6).valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default profileRouter;
