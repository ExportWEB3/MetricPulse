import { Request, Response, NextFunction } from 'express';
import {
  validatorSchemaFunc,
  CreateUserSchemaValidator,
  LoginSchemaValidator,
  CreateUserSchemaAdminValidator,
  UserUpdateSchemaValidator,
} from '../utilities/validation.system.schema.js';
import { ValidationSchema } from '../utilities/typedeclaration.js';

export function validateUserInput(req: Request, res: Response, next: NextFunction): void {
  const error = validatorSchemaFunc(
    req.body,
    CreateUserSchemaValidator?.schema as ValidationSchema
  );

  if (error) {
    res.status(400).json({
      status: false,
      statusCode: 400,
      message: error,
    });
    return;
  }

  next();
}

export function validateLoginInput(req: Request, res: Response, next: NextFunction): void {
  const error = validatorSchemaFunc(
    req.body,
    LoginSchemaValidator?.schema as ValidationSchema
  );

  if (error) {
    res.status(400).json({
      status: false,
      statusCode: 400,
      message: error,
    });
    return;
  }

  next();
}

export function validateCreateUserAdminInput(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const error = validatorSchemaFunc(
    req.body,
    CreateUserSchemaAdminValidator?.schema as ValidationSchema
  );

  if (error) {
    res.status(400).json({
      status: false,
      statusCode: 400,
      message: error,
    });
    return;
  }

  next();
}

export function validateUserUpdateInput(req: Request, res: Response, next: NextFunction): void {
  const error = validatorSchemaFunc(
    req.body,
    UserUpdateSchemaValidator?.schema as ValidationSchema
  );

  if (error) {
    res.status(400).json({
      status: false,
      statusCode: 400,
      message: error,
    });
    return;
  }

  next();
}
