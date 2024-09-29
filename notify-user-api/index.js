const express = require('express');
const cors = require('cors');
const { PORT, NOTIFY_USER_QUEUE } = require('./config');
const { receiveMessageFromQueue } = require('./helpers/mqConfig');
const sendEmail = require('./helpers/mailNotification');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/healthcheck', (req, res) => {
  res.send('Hello World!');
});

/**
 * Receives messages from the notifyUser queue and sends an email notification.
 *
 * @param {string} queue - The name of the queue to receive messages from.
 * @param {Function} callback - The callback function to process received messages.
 * @param {Error} callback.err - The error object if an error occurs.
 * @param {Object} callback.message - The received message.
 * @returns {void}
 */
receiveMessageFromQueue(NOTIFY_USER_QUEUE, async (err, message) => {
  if (err) {
    console.error('Error receiving message:', err);
    return;
  }

  if (message) {
    const { email, name } = message;

    try {
      await sendEmail(email, 'Notification', `Greetings  ${name}!`);

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  } else {
    console.error('Invalid message:', message);
  }
});

app.listen(PORT, () => {
  console.log(`Notify User API listening on port ${PORT}`);
});
