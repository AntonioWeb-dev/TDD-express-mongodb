import { Request, Response } from 'express';
import UserModel from '../models/User';

class UserController {

  async index(req: Request, res: Response) {
    const users = await UserModel.find();
    return res.json(users);
  }

  async show(req: Request, res: Response) {
    const user = await UserModel.findOne(req.params);
    return res.json(user);
  }

  async create(req: Request, res: Response) {
    const { name, email, age } = req.body;
    const newUser = new UserModel({ name, email, age });
    try {
      await newUser.save();
    } catch (err) {
      return res.status(404).json('Bad request');
    }
    return res.json(newUser);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    let isDeleted;
    try {
      isDeleted = await UserModel.findOneAndRemove({ id });
    } catch (err) {
      return res.status(404).json('Bad request');
    }
    return res.json(isDeleted);
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const body = req.body;
    let userUpdated;
    try {
      userUpdated = await UserModel.findOneAndUpdate({ id }, body);
    } catch (err) {
      return res.status(404).json('Bad request');
    }
    return res.json(userUpdated);
  }
}

export default new UserController
