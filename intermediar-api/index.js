import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { MONGO_URI, PORT } from './config';
import userRouter from './routes/user';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', userRouter);

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('Connected to MongoDB'); })
  .catch(error => { console.error('Error connecting to MongoDB: ', error); });

app.listen(PORT, () => {
  console.log('User API listening on port 3001');
});
