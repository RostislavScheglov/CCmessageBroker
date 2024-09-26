const express = require('express');
const cors = require('cors');
const { PORT, NOTIFY_USER_QUEUE } = require('./config');
const { receiveMessageFromQueue } = require('./helpers/mqConfig');
const { sendEmail } = require('./helpers/mailNotification');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/healthcheck', (req, res) => {
  res.send('Hello World!');
});

receiveMessageFromQueue(NOTIFY_USER_QUEUE, async (err, message) => {
  console.log('Received message from notifyUser queue:', message);
  const { email, name } = message;

  try {
    await sendEmail(email, 'Notification', `Greetings ${name}!`);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
});

app.listen(PORT, () => {
  console.log(`User API listening on port ${PORT}`);
});
