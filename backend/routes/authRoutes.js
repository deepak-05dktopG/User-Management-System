import express from 'express';
import { register, login, refreshToken, logout } from '../controllers/authController.js';
import { validateRegistration, validateLogin } from '../middleware/validation.js';
import { upload } from '../middleware/upload.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', authRateLimiter, upload.single('profile_image'), validateRegistration, register);
router.post('/login', authRateLimiter, validateLogin, login);
router.post('/refresh', refreshToken);
router.post('/logout', authenticate, logout);

export default router;
