import express from 'express';
import { registerUser } from '../controllers/user';

/**
 * User router
 *
 * @category routers
 */
const router = express.Router();

router.post('/auth/register', registerUser);

export default router;
