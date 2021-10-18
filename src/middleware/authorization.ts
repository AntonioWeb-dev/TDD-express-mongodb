import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import CustomError from '../utils/CustomError';

export function authorization(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).json({})
  }
  const token = authorization.split(" ")[1]
  try {
    const id = verifyToken(token);
    req.user_id = id;
  } catch (err: any) {
    return res.status(err.status).json(err.message);
  }
  return next();
}

function verifyToken(token: string) {
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET || "undefined");
    const { id }: string | any = decode;
    return id;
  } catch (err) {
    throw new CustomError("Invalid token", 401);
  }
}
