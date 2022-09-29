import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined!');
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
