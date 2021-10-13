import { NextFunction, Request, Response } from 'express';
import { AuthenticationService } from '../service/AuthenticationService';
export function authorization(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).json({})
  }
  const token = authorization.split(" ")[1]
  const { id } = AuthenticationService.verifyToken(token);
  req.user_id = id;
  return next();
}
