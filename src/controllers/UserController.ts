import { Request, Response } from 'express';
import { IUserService } from '../interfaces/IUser/userService.interface';

/**
 * @class UserController
 * @desc Responsável por lidar com solicitações de API para a rota /users
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

  async index(req: Request, res: Response) {
    const users = await this.userService.index();
    return res.json(users);
  }

  async show(req: Request, res: Response) {
    const user = await this.userService.show(req.params.id);
    return res.json(user);
  }

  async create(req: Request, res: Response) {
    const { name, email, age } = req.body;
    let newUser = {};
    try {
      newUser = await this.userService.create({ name, email, age })
    } catch (err: any) {
      return res.status(err.status).json(err.message);
    }
    return res.json(newUser);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    let isDeleted;
    try {
      isDeleted = await this.userService.delete(id);
    } catch (err: any) {
      return res.status(err.status).json(err.message);
    }
    return res.json(isDeleted);
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    let userUpdated;
    try {
      userUpdated = await this.userService.update(id, req.body);
    } catch (err: any) {
      return res.status(err.status).json(err.message);
    }
    return res.json(userUpdated);
  }
}
