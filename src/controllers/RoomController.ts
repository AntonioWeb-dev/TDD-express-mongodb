import { NextFunction, Request, Response } from 'express';
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
    this.newMember = this.newMember.bind(this);
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const rooms = await this.roomService.index();
      return res.json(rooms);
    } catch (err) {
      next(err)
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const room = await this.roomService.show(req.body.id);
      return res.json(room);
    } catch (err) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const ownerId = req.user_id;
    const { maxConnections, name } = req.body;
    try {
      const members = [ownerId]
      const admins = [ownerId]
      const newRoom = await this.roomService.create({
        maxConnections,
        ownerId,
        name,
        members,
        admins,
      });
      return res.json(newRoom);
    } catch (err: any) {
      next(err)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    let isDeleted;
    try {
      isDeleted = await this.roomService.delete(id);
      return res.json(isDeleted);
    } catch (err) {
      next(err)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const body = req.body;
    let roomUpdated;
    try {
      roomUpdated = await this.roomService.update(id, body);
      return res.json(roomUpdated);
    } catch (err) {
      next(err)
    }
  }

  async newMember(req: Request, res: Response, next: NextFunction) {
    const { roomID } = req.params
    const { userID } = req.body;
    try {
      const room = await this.roomService.addMember(userID, roomID)
      return res.json(room)
    } catch (err) {
      next(err)
    }
  }
}
