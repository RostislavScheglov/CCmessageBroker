const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGO_URI, PORT } = require('./config');
const userRouter = require('./routes/user');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', userRouter);

app.get('/healthcheck', (req, res) => {
  res.send('Hello World!');
});

mongoose.connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => { console.log('Connected to MongoDB'); })
  .catch(error => { console.error('Error connecting to MongoDB: ', error); });

app.listen(PORT, () => {
  console.log(`User API listening on port ${PORT}`);
});
