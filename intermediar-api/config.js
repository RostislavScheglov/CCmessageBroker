import dotenv from 'dotenv';

dotenv.config();

const {
  MONGO_URI,
  PORT,
  RABBITMQ_URL,
  NOTIFY_USER_QUEUE
} = process.env;

export {
  PORT,
  MONGO_URI,
  RABBITMQ_URL,
  NOTIFY_USER_QUEUE
};
