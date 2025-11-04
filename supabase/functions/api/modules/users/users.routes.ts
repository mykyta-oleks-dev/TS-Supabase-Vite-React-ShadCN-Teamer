import { Hono } from '@hono/hono';
import usersController from './users.controller.ts';
import { requireAuth } from '../../_shared/middleware/authentication.middleware.ts';
import { USERS_ROUTES } from './constants/routes.constants.ts';

const usersRouter = new Hono();

usersRouter.post(USERS_ROUTES.SIGN_UP, usersController.signUp);
usersRouter.post(USERS_ROUTES.LOG_IN, usersController.logIn);
usersRouter.post(USERS_ROUTES.ROOT, requireAuth, usersController.createProfile);
usersRouter.get(USERS_ROUTES.ROOT, requireAuth, usersController.getAll);
usersRouter.get(USERS_ROUTES.DYNAMIC, requireAuth, usersController.getOne);

export default usersRouter;
