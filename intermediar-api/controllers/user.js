const { NOTIFY_USER_QUEUE } = require('../config');
const User = require('../db/userModel');
const { sendMessageToQueue } = require('../helpers/mqConfig');
const { STATUS_CODES } = require('../helpers/statusCodes');

/**
 * User Controllers
 *
 * @category controller
 *
 */

/**
 * Controller function to register a user.
 *
 * @category function
 *
 * @param {import('express').Request} req - The request contains user registration data in the body.
 * @param {import('express').Response} res - The Express response object.
 * @param {Function} next - The Express next function used to pass control to the next middleware.
 * @returns {Promise<void>} A Promise that resolves when the response is sent.
 */
const registerUser = async (req, res, next) => {
  try {
    const {
      name, email, country, password
    } = req.body;
    const newUser = new User({
      name, email, password, country
    });

    await newUser.save();

    const { password: _, ...userToQueue } = newUser.toObject();

    sendMessageToQueue(NOTIFY_USER_QUEUE, userToQueue, err => {
      if (err) {
        console.error('Error sending message:', err);
      }
    });

    res.status(STATUS_CODES.CREATED).send('User created');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
};

module.exports = {
  registerUser
};
