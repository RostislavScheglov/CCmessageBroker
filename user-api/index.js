import express from 'express';
import amqp from 'amqplib/callback_api';
import nodemailer from 'nodemailer';

const app = express();
const RABBITMQ_URL = 'amqp://localhost';
const QUEUE = 'notifyUser';

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email service
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

const sendEmail = (email, subject, text) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error sending email:', error);
        }
        console.log('Email sent:', info.response);
    });
};

amqp.connect(RABBITMQ_URL, (err, connection) => {
    if (err) throw err;
    connection.createChannel((err, channel) => {
        if (err) throw err;
        channel.assertQueue(QUEUE, { durable: false });
        channel.consume(QUEUE, (msg) => {
            const message = JSON.parse(msg.content.toString());
            console.log(`Received message: ${message}`);
            // Extract email details from the message

            const { email, subject, text } = message;
            sendEmail(email, subject, text);
            channel.ack(msg);
            
        });
    });
});

app.listen(3003, () => {
    console.log('Notify User API listening on port 3003');
});