import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';

import '@shared/container/providers';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(`${uploadConfig.tmpFolder}/uploads`));
app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // eslint-disable-next-line no-console
  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀️ Server started on port 3333');
});
