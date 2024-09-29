const amqp = require('amqplib/callback_api');
const { RABBITMQ_URL } = require('../config');

/**
 * Sends a message to the specified queue.
 *
 * @param {string} queue - The name of the queue to send the message to.
 * @param {Object} message - The message to send to the queue.
 * @returns {void}
 */
const sendMessageToQueue = (queue, message) => {
  amqp.connect(RABBITMQ_URL, (err, connection) => {
    if (err) {
      console.error('Failed to connect to RabbitMQ', err);
      return;
    }

    connection.createChannel((error, channel) => {
      if (error) {
        console.error('Failed to create channel', error);
        return;
      }

      channel.assertQueue(queue, { durable: false });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
      console.log(`Sent message to ${queue}`);
    });
  });
};

/**
 * Receives messages from the specified queue and processes them using the provided callback.
 *
 * @param {string} queue - The name of the queue to receive messages from.
 * @param {Function} callback - The callback function to process received messages.
 * @param {Error} callback.err - The error object if an error occurs.
 * @param {Object} callback.message - The received message.
 * @returns {void}
 */
const receiveMessageFromQueue = (queue, callback) => {
  amqp.connect(RABBITMQ_URL, (err, connection) => {
    if (err) {
      return callback(err);
    }

    connection.createChannel((error, channel) => {
      if (error) {
        return callback(error);
      }

      channel.assertQueue(queue, { durable: false });
      channel.consume(queue, msg => {
        if (msg !== null) {
          console.log(`Received message from ${queue}`);
          callback(null, JSON.parse(msg.content.toString()));

          channel.ack(msg);
        } else {
          callback(new Error('No message received'));
        }
      });

      return null;
    });
    return null;
  });
};

module.exports = {
  sendMessageToQueue,
  receiveMessageFromQueue
};
