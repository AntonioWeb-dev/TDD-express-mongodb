import { NextFunction, Request, Response } from 'express';
import { deleteImage } from '../infra/aws/services/S3/deleteImage';
import { UploadImage } from '../infra/aws/services/S3/uploadImage';
import { IRoomService } from '../interfaces/IRoom/roomService.interface';
import { IS3Service } from '../interfaces/s3.interface';
import MulterConfig from '../utils/Multer';


export class RoomController {
  private roomService: IRoomService;
  private S3: IS3Service;
  constructor(roomService: IRoomService, S3: IS3Service) {
    this.roomService = roomService;
    this.S3 = S3;
    this.create = this.create.bind(this);
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.newMember = this.newMember.bind(this);
    this.removeMember = this.removeMember.bind(this);
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
    const { name } = JSON.parse(req.body['body']);
    const file = req.file;

    let avatarURL: string | undefined;
    if (file != null) {
      avatarURL = await UploadImage(this.S3, MulterConfig.directory, file.filename, 'rooms_avatars')
    }

    try {
      const members = [ownerId]
      const admins = [ownerId]
      const newRoom = await this.roomService.create({
        ownerId,
        name,
        room_avatar: avatarURL,
        members,
        admins,
      });
      return res.json(newRoom);
    } catch (err: any) {
      if (file != null && typeof (avatarURL) == 'string') {
        await deleteImage(this.S3, avatarURL)
      }
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
    const { user_id } = req.body;
    try {
      const room = await this.roomService.addMember(user_id, roomID)
      return res.json(room)
    } catch (err) {
      next(err)
    }
  }

  async removeMember(req: Request, res: Response, next: NextFunction) {
    const { roomID } = req.params
    const { user_id } = req.body;
    try {
      await this.roomService.removeMember(roomID, user_id);
      return res.status(204).json({})
    } catch (err) {
      next(err)
    }
  }
}
