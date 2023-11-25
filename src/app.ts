import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import createDebug from 'debug'; /* 

Import { errorMiddleware } from './middleware/error.middleware.js';
import { usersRouter } from './routers/users.router.js'; */

const debug = createDebug('W7E:app');

export const app = express();
debug('Starting');

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));
/* 
App.use('/tasks', tasksRouter); */
/* 
app.use(errorMiddleware); */
