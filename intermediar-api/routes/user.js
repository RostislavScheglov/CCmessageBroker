const express = require('express');
const { registerUser } = require('../controllers/user');
const checkUserExists = require('../middleware/checkUserExists');

/**
 * User router
 *
 * @category routers
 */
const router = express.Router();

router.post('/register', checkUserExists, registerUser);

module.exports = router;
