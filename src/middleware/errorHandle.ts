import { Request, Response, NextFunction } from 'express';
import { ICustomError } from '../interfaces/error.interface';

export const errorHandler = (err: ICustomError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(err.status).json({
      error: err.message,
    });
  }
  return res.status(500).json({
    message: 'Internal server error',
  });
};
