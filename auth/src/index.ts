import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';

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

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URL) {
    throw new Error('DB connection string must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('connected to MongoDb');
  } catch (err) {
    console.log(err);
  }
};

app.listen(3000, () => {
  console.log('listening on port 3000...');
});

start();
