const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGO_URI, PORT, NOTIFY_USER_QUEUE } = require('./config');
const { receiveMessageFromQueue } = require('./helpers/mqConfig');
const { STATUS_CODES } = require('./helpers/statusCodes');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/healthcheck', (req, res) => {
  res.send('Hello World!');
});

receiveMessageFromQueue(NOTIFY_USER_QUEUE, (err, message) => {
  console.log('Received message from notifyUser queue:', message);
  // res.status(STATUS_CODES.CREATED).send(message);
});

// mongoose.connect(MONGO_URI, { useNewUrlParser: true })
//   .then(() => { console.log('Connected to MongoDB'); })
//   .catch(error => { console.error('Error connecting to MongoDB: ', error); });

app.listen(PORT, () => {
  console.log(`User API listening on port ${PORT}`);
});
