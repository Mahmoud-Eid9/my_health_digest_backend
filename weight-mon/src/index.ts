import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';


import { errorHandler } from '@myhealthdigest/auth-middleware';
import { NotFoundError } from '@myhealthdigest/auth-middleware';
import { main } from './routers/main';
import { calories } from './routers/calories';

const app = express();
app.use(json());


app.use(main)
app.use(calories)

app.use((req, res, next) => {
  res.status(404).send({
  status: 404,
  error: 'Not found'
  })
 })

app.use(errorHandler);

const start = async () => {
  console.log("Sarting...");
  // if (!process.env.JWT_KEY) {
  //   throw new Error('JWT_KEY must be defined');
  // }
  // if (!process.env.MONGO_URL) {
  //   throw new Error('DB connection string must be defined');
  // }

  try {
    await mongoose.connect('mongodb+srv://Mahmoudeid99:EI1MOd493yUBUIa4@myhealthdigest.scz4t.mongodb.net/WeightMonitoring?retryWrites=true&w=majority');
    console.log('connected to MongoDb');
  } catch (err) {
    console.log(err);
  }
};

app.listen(3006, () => {
  console.log('listening on port 3006...');
});

start();
