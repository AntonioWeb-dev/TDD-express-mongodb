import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import argon from "argon2";
import { IUserService } from '../interfaces/IUser/userService.interface';
import CustomError from '../utils/CustomError';

export class AuthenticationController {
  private userService: IUserService;
  private secretKey: string;

  constructor(userService: IUserService) {
    this.userService = userService;
    this.login = this.login.bind(this);
    this.secretKey = process.env.JWT_SECRET || "undefined";
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const user = await this.userService.findByEmail(email);
    let token: string;

    if (user.password && await argon.verify(user.password, password)) {
      token = jwt.sign({ id: user._id, email: user.email, name: user.name }, this.secretKey, { expiresIn: 60 * (60 * 2) });
      return res.json({ token, avatar: user.avatar, email: user.email, user_id: user._id, name: user.name });
    } else {
      const err = new CustomError("Email or password in correct", 401);
      next(err);
    }
  }
}
