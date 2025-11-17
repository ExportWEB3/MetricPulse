import { Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { AuthRequest, TokenPayload } from '../types/index.js';
import { validateEmail, validatePassword } from '../utilities/validation.js';
import sanitizedConfig from '../config/env.js';

// Generate tokens
const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, sanitizedConfig.JWT_SECRET, {
    expiresIn: '15m', // Short-lived access token
  });

  const refreshToken = jwt.sign({ userId }, sanitizedConfig.JWT_REFRESH_SECRET, {
    expiresIn: '7d', // Long-lived refresh token
  });

  return { accessToken, refreshToken };
};

// Register handler
export const register = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validation
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      res.status(400).json({ error: emailValidation.error });
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      res.status(400).json({ error: passwordValidation.error });
      return;
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(400).json({ error: 'Email already registered' });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      email: email.toLowerCase(),
      password: hashedPassword
    });

    await user.save();

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id.toString());

    // Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    res.status(201).json({
      message: 'User created successfully',
      payload: {
        token: accessToken,
        user: {
          _id: user._id,
          email: user.email
        }
      }
    });
  } catch (error: any) {
    console.error('Register error:', error);
    next(error);
  }
};

// Login handler
export const login = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id.toString());

    // Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    res.json({
      message: 'Login successful',
      payload: {
        token: accessToken,
       user: {
          _id: user._id,
          email: user.email
        }
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    next(error);
  }
};

// Refresh token handler
export const refreshAccessToken = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      res.status(401).json({ error: 'Refresh token not found' });
      return;
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, sanitizedConfig.JWT_REFRESH_SECRET) as TokenPayload;

    // Get user
    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    // Generate new access token
    const accessToken = jwt.sign({ userId: user._id }, sanitizedConfig.JWT_SECRET, {
      expiresIn: '15m',
    });

    // Optionally generate new refresh token
    const newRefreshToken = jwt.sign({ userId: user._id }, sanitizedConfig.JWT_REFRESH_SECRET, {
      expiresIn: '7d',
    });

    // Update refresh token cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    res.json({
      message: 'Token refreshed successfully',
      payload: {
        token: accessToken,
        user: {
          _id: user._id,
          email: user.email
        }
      }
    });
  } catch (error: any) {
    console.error('Refresh token error:', error);
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ error: 'Refresh token expired' });
      return;
    }
    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ error: 'Invalid refresh token' });
      return;
    }
    next(error);
  }
};

// Logout handler
export const logout = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.userId; // From auth middleware
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!userId) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    // Find user and add token to revoked list
    if (token) {
      const user = await User.findById(userId).select('+revokedTokens');
      if (user) {
        // Add current token to revoked tokens
        if (!user.revokedTokens) {
          user.revokedTokens = [];
        }
        user.revokedTokens.push(token);
        await user.save();
      }
    }

    // Clear the refresh token cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      path: '/',
    });

    res.json({
      message: 'Logout successful',
    });
  } catch (error: any) {
    console.error('Logout error:', error);
    next(error);
  }
};

