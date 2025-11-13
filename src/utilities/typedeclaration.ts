import { Response, Request, NextFunction } from 'express';

export interface ValidationSchema {
  [key: string]: {
    type: string;
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    custom?: (value: any) => boolean | string;
  };
}

export interface AppErrorOptions {
  statusCode: number;
  message: string;
  isOperational?: boolean;
}

export interface ClientResponse<T = any> {
  status: boolean;
  statusCode: number;
  message: string;
  data?: T;
}

export interface TokenPayload {
  userId: string;
  email?: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}
