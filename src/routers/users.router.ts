import { UsersController } from '../controllers/users.controller.js';
import createDebug from 'debug';
import { Router as createRouter } from 'express';
import { UsersMongoRepo } from '../repos/users/users.mongo.repo.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { FileInterceptor } from '../middleware/file.interceptor.js';

const debug = createDebug('W8E:users:router');

export const usersRouter = createRouter();
debug('Starting');

const repo = new UsersMongoRepo();
const controller = new UsersController(repo);
const interceptor = new AuthInterceptor();
const fileInterceptor = new FileInterceptor();

usersRouter.get(
  '/',
  interceptor.authorization.bind(interceptor),
  controller.getAll.bind(controller)
); // Ver todos los usuarios

usersRouter.post(
  '/register',
  fileInterceptor.singleFileStore('avatar').bind(fileInterceptor),
  controller.create.bind(controller)
); // Crear usuario
usersRouter.post('/login', controller.login.bind(controller)); // Hacer log in
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

// A usersRouter.patch( // Token JWT
//   '/login',
//   interceptor.authorization.bind(interceptor),
//   controller.login.bind(controller)
// );
usersRouter.patch(
  '/:id',
  interceptor.authorization.bind(interceptor),
  interceptor.authentication.bind(interceptor),

  controller.update.bind(controller)
);

usersRouter.delete(
  '/:id',
  // Add ADMIN interceptor.authorization.bind(interceptor),
  // interceptor.authentication.bind(interceptor),
  controller.delete.bind(controller)
);

usersRouter.patch(
  '/remove-friend/:id',
  interceptor.authorization.bind(interceptor),
  controller.removeFriend.bind(controller)
);

usersRouter.patch(
  '/remove-enemy/:id',
  interceptor.authorization.bind(interceptor),
  controller.removeEnemy.bind(controller)
);
