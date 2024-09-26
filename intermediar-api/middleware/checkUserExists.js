const User = require('../db/userModel');
const { STATUS_CODES } = require('../helpers/statusCodes');

/**
 * Middleware to check if a user with the given email already exists.
 *
 * @category middleware
 *
 * @param {import('express').Request} req - The request contains user registration data in the body.
 * @param {import('express').Response} res - The Express response object.
 * @param {Function} next - The Express next function used to pass control to the next middleware.
 * @returns {Promise<void>} A Promise that resolves when the response is sent.
 */
const checkUserExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(STATUS_CODES.BAD_REQUEST).send('User with this email already exists');
    }

    return next();
  } catch (error) {
    console.error('Error checking user existence:', error);
    return res.status(STATUS_CODES.SERVER_ERROR).send('Error checking user existence');
  }
};

module.exports = checkUserExists;
