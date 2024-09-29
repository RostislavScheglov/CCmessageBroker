const nodemailer = require('nodemailer');
/**
 * Nodemailer transporter for sending emails.
 *
 * @type {import('nodemailer').Transporter}
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Sends an email using the configured transporter.
 *
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The text content of the email.
 * @returns {Promise<import('nodemailer').SentMessageInfo>} A promise that
 *              resolves to the result of the email sending operation.
 */
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
