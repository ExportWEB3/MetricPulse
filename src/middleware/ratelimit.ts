import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

export interface RateLimitOptions {
  windowMs: number;
  max: number;
  message: string;
  standardHeaders?: boolean;
  legacyHeaders?: boolean;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

export const createRateLimit = (options: RateLimitOptions) => {
  return rateLimit({
    windowMs: options.windowMs,
    max: options.max,
    message: options.message,
    standardHeaders: options.standardHeaders || true,
    legacyHeaders: options.legacyHeaders || false,
    skipSuccessfulRequests: options.skipSuccessfulRequests || false,
    skipFailedRequests: options.skipFailedRequests || false,
    handler: (req: Request, res: Response) => {
      res.status(429).json({
        status: false,
        statusCode: 429,
        message: options.message,
      });
    },
  });
};

// Define different rate limiters
export const loginRateLimiter = createRateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,
  message: 'Too many login attempts. Try again in 5 minutes.',
});

export const refreshRateLimiter = createRateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100,
  message: 'Too many refresh attempts. Please slow down.',
});

export const registerRateLimiter = createRateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,
  message: 'Too many registration attempts. Please slow down.',
});

export const resendEmailRateLimiter = createRateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 2,
  message: 'Too many verification email requests. Try again later.',
});

export const metricsUploadRateLimiter = createRateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: 'Too many metrics upload attempts. Try again later.',
});
