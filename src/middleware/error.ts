import { ErrorRequestHandler } from 'express';
import { ClientResponse } from '../utilities/typedeclaration.js';

class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  console.error('Error:', error);

  const clientRes: ClientResponse = {
    status: false,
    statusCode: 400,
    message: 'Something went wrong',
  };

  if (error.name === 'CastError') {
    clientRes.message = 'Invalid resource ID';
    clientRes.statusCode = 400;
  } else if (error.name === 'ValidationError') {
    const messages = Object.values((error as any).errors || {}).map(
      (val: any) => val.message
    );
    clientRes.message = messages.join(', ') || clientRes.message;
    clientRes.statusCode = 400;
  } else if ((error as any).code === 11000) {
    const field = Object.keys((error as any).keyValue || {})[0];
    clientRes.message = field
      ? `Duplicate value for '${field}'`
      : 'Duplicate key error';
    clientRes.statusCode = 400;
  } else if (error instanceof AppError && error.isOperational) {
    clientRes.message = error.message;
    clientRes.statusCode = error.statusCode;
  } else if ((error as any).statusCode === 401) {
    clientRes.message = error.message || 'Unauthorized';
    clientRes.statusCode = 401;
  } else if (typeof (error as any).statusCode === 'number') {
    clientRes.message = error.message || clientRes.message;
    clientRes.statusCode = (error as any).statusCode;
  } else {
    clientRes.message = error.message || clientRes.message;
  }

  if (typeof clientRes?.message !== 'string') {
    clientRes.message = 'Something went wrong, try again or contact Support';
  }

  res.status(clientRes.statusCode as number).json(clientRes);
};

export { AppError };
export default errorMiddleware;
