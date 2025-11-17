import { Router } from 'express';
import { login, register, refreshAccessToken, logout } from '../controllers/auth.controller.js';
import { loginRateLimiter, registerRateLimiter, refreshRateLimiter } from '../middleware/ratelimit.js';
import { validateUserInput } from '../middleware/validation.middleware.js';
import { authMiddleware } from '../middleware/auth.js';

const authRouter = Router();

// Register endpoint with rate limiting and validation
authRouter.post('/register', registerRateLimiter, validateUserInput, register);

// Login endpoint with rate limiting
authRouter.post('/login', loginRateLimiter, login);

// Refresh token endpoint with rate limiting
authRouter.post('/refresh', refreshRateLimiter, refreshAccessToken);

// Logout endpoint - requires authentication
authRouter.post('/logout', authMiddleware, logout);

export default authRouter;

