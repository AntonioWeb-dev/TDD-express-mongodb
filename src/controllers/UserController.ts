import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/IUser/user.interface';
import { IUserService } from '../interfaces/IUser/userService.interface';
import { SendEmail } from '../aws/services/SES/Ses.send-email';
import { GetTemplates } from '../utils/GetPath';

/**
 * @class UserController
 * @desc Responsible to handle with requests meda to API - endpoint: /users
 **/

export class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
    this.create = this.create.bind(this);
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.index();
      return res.json(users);
    } catch (err) {
      next(err)
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.show(req.params.id);
      return res.json(user);
    } catch (err) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const { name, email, age } = req.body;
    let newUser: IUser;
    try {
      newUser = await this.userService.create({ name, email, age })
      const template = await GetTemplates('CreateAcount');
      const emailService = new SendEmail("Conta criada", template);
      emailService.send([newUser.email])
      return res.json(newUser);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    let isDeleted;
    try {
      isDeleted = await this.userService.delete(id);
    } catch (err) {
      next(err);
    }
    return res.json(isDeleted);
  }
  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    let userUpdated;
    try {
      userUpdated = await this.userService.update(id, req.body);
    } catch (err) {
      next(err);
    }
    return res.json(userUpdated);
  }
}
