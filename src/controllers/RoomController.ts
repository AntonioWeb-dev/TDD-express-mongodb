import { Request, Response } from 'express';
import { IRoomService } from '../interfaces/IRoom/roomService.interface';

export class RoomController {
  private roomService: IRoomService;
  constructor(roomService: IRoomService) {
    this.roomService = roomService;
    this.create = this.create.bind(this);
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  async index(req: Request, res: Response) {
    const rooms = await this.roomService.index();
    return res.json(rooms);
  }

  async show(req: Request, res: Response) {
    const room = await this.roomService.show(req.body.id);
    return res.json(room);
  }

  async create(req: Request, res: Response) {
    const ownerId = req.headers['ownerid'];
    if (typeof ownerId !== 'string') {
      return res.status(400).json('Missing ownerId');
    }
    const { maxConnections, name } = req.body;
    let newRoom = {};
    try {
      newRoom = await this.roomService.create({ maxConnections, ownerId, name });
    } catch (err: any) {
      return res.status(err.status).json(err.message);
    }
    return res.json(newRoom);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    let isDeleted;
    try {
      isDeleted = await this.roomService.delete(id);
    } catch (err: any) {
      return res.status(err.status).json(err.message);
    }
    return res.json(isDeleted);
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const body = req.body;
    let roomUpdated;
    try {
      roomUpdated = await this.roomService.update(id, body);
    } catch (err) {
      return res.status(404).json('Bad request');
    }
    return res.json(roomUpdated);
  }
}
