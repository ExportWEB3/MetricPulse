import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Type definitions for environment variables
interface ENV {
  MONGO_URL: string | undefined;
  JWT_SECRET: string | undefined;
  JWT_REFRESH_SECRET: string | undefined;
  PORT: string | undefined;
  NODE_ENV: string | undefined;
  FRONTEND_URL: string | undefined;
  GEMINI_API_KEY: string | undefined;
}

// Type definition for validated config
interface Config {
  MONGO_URL: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  PORT: string;
  NODE_ENV: string;
  FRONTEND_URL: string;
  GEMINI_API_KEY: string;
}

/**
 * Load all environment variables
 */
const configEnv = (): ENV => {
  return {
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    PORT: process.env.PORT || '5000',
    NODE_ENV: process.env.NODE_ENV || 'development',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  };
};

/**
 * Validate required environment variables
 */
const loadEnv = (config: ENV): Config => {
  const requiredKeys: (keyof ENV)[] = [
    'MONGO_URL',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
    'PORT',
    'GEMINI_API_KEY',
  ];

  const missingKeys: string[] = [];

  for (const key of requiredKeys) {
    if (!config[key]) {
      missingKeys.push(key);
    }
  }

  if (missingKeys.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingKeys.join(', ')}\n` +
      `Please add these to your .env file`
    );
  }

  return config as Config;
};

// Load and validate config
const env = configEnv();
const sanitizedConfig = loadEnv(env);

export default sanitizedConfig;
