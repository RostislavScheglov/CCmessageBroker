import { NOTIFY_USER_QUEUE } from '../config';
import { User } from '../db/userModel';
import { sendMessageToQueue } from '../helpers/mqConfig';
import { STATUS_CODES } from '../helpers/statusCodes';

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
export const registerUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    console.log('User created:', newUser);

    // Send message to notifyUser queue
    sendMessageToQueue(NOTIFY_USER_QUEUE, { name: newUser.name, email: newUser.email });

    return res.status(STATUS_CODES.CREATED).json();
  } catch (error) {
    return next(error);
  }
};
