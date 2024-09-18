import amqp from 'amqplib/callback_api';
import { RABBITMQ_URL } from '../config';

export const sendMessageToQueue = (queue, message) => {
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
