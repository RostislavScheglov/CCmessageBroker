const express = require('express');
const { registerUser } = require('../controllers/user');

/**
 * User router
 *
 * @category routers
 */
const router = express.Router();

router.post('/auth/register', registerUser);

module.exports = router;