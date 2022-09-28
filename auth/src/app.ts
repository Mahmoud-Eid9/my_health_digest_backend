import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { accessRouter } from './routes/access-codes';
import { errorHandler } from '@myhealthdigest/auth-middleware';
import { NotFoundError } from '@myhealthdigest/auth-middleware';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(accessRouter);

app.use((req, res, next) => {
  res.status(404).send({
    status: 404,
    error: 'Not found',
  });
});

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
