const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  password: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  country: {
    type: String
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
