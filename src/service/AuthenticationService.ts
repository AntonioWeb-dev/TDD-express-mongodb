import jwt from "jsonwebtoken";
import argon from "argon2";
import { IUserService } from '../interfaces/IUser/userService.interface';
import CustomError from '../utils/CustomError';
import { IAuthenticationService } from '../interfaces/IAuthentication/authenticationService.interface';


export class AuthenticationService implements IAuthenticationService {
  private userService: IUserService;
  private secretKey: string;
  constructor(userService: IUserService) {
    this.userService = userService;
    this.secretKey = process.env.JWT_SECRET || "undefined";
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    let token: string;
    if (await argon.verify(user.password, password)) {
      token = jwt.sign({ id: user._id, email: user.email, name: user.name }, this.secretKey, { expiresIn: 60 * (60 * 2) });
    } else {
      throw new CustomError("Email or password in correct", 401);
    }
    return token;
  }

  static verifyToken(token: string) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET || "undefined");
      const { id }: string | any = decode;
      return id;
    } catch (err) {
      throw new CustomError("Invalid token", 401);
    }
  }
}
