import { Router as createRouter } from 'express';
import { UsersController } from '../controllers/users.controller.js';
import createDebug from 'debug';
import { UsersMongoRepo } from '../repos/users/users.mongo.repo.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';

const debug = createDebug('w7E:users:router');

export const usersRouter = createRouter();
debug('Starting');

const repo = new UsersMongoRepo();
const controller = new UsersController(repo);
const interceptor = new AuthInterceptor();

usersRouter.get('/', controller.getAll.bind(controller));
usersRouter.post('/register', controller.create.bind(controller));
usersRouter.post('/login', controller.login.bind(controller));
/* UsersRouter.patch(
  '/login',
  interceptor.authorization.bind(interceptor),
  controller.login.bind(controller)
); */
/* UsersRouter.patch(
  '/addFriend',
  interceptor.authorization.bind(interceptor),
  controller.login.bind(controller)
); */
// Añadir usuario a amigo
usersRouter.patch(
  '/add-friend/:id',
  interceptor.authorization.bind(interceptor),
  controller.addFriend.bind(controller)
);
usersRouter.patch(
  '/add-enemy/:id',
  interceptor.authorization.bind(interceptor),
  controller.addEnemy.bind(controller)
);
