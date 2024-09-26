const dotenv = require('dotenv');

dotenv.config();

const {
  MONGO_URI,
  PORT,
  RABBITMQ_URL,
  NOTIFY_USER_QUEUE,
  EMAIL_USER,
  EMAIL_PASS
} = process.env;

module.exports = {
  PORT,
  MONGO_URI,
  RABBITMQ_URL,
  NOTIFY_USER_QUEUE,
  EMAIL_USER,
  EMAIL_PASS
};
