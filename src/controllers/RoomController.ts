import { Request, Response } from 'express';
import RoomModel from '../models/Room';

class RoomController {

  async index(req: Request, res: Response) {
    const Rooms = await RoomModel.find();
    return res.json(Rooms);
  }

  async show(req: Request, res: Response) {
    const room = await RoomModel.findOne(req.params);
    return res.json(room);
  }

  async create(req: Request, res: Response) {
    const ownerId = req.headers.ownerid;
    const { maxConnections } = req.body;
    const newRoom = new RoomModel({ ownerId, maxConnections });
    try {
      await newRoom.save();
    } catch (err) {
      return res.status(404).json('Bad request');
    }
    return res.json(newRoom);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    let isDeleted;
    try {
      isDeleted = await RoomModel.findOneAndRemove({ id });
    } catch (err) {
      return res.status(404).json('Bad request');
    }
    return res.json(isDeleted);
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const body = req.body;
    let roomUpdated;
    try {
      await RoomModel.findOneAndUpdate({ id }, body);
      roomUpdated = await RoomModel.findOne({ id });
    } catch (err) {
      return res.status(404).json('Bad request');
    }
    return res.json(roomUpdated);
  }
}

export default new RoomController
