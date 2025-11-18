import { Request } from 'express';

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export interface IMetric {
  _id?: string;
  userId: string;
  date: Date;
  mrr: number;
  users: number;
  churn: number;
  newUsers: number;
  revenue: number;
  uploadedAt?: Date;
}

export interface IInsight {
  _id?: string;
  userId: string;
  insights: Array<{
    title: string;
    description: string;
    severity: 'success' | 'warning' | 'info';
  }>;
  generatedAt?: Date;
}

export interface AuthRequest extends Request {
  userId?: string;
  file?: any;
}

export interface ParsedMetric extends IMetric {
  userId: string;
}

export interface TokenPayload {
  userId: string;
  iat?: number;
  exp?: number;
}
