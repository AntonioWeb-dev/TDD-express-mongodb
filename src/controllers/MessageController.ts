import { NextFunction, Response, Request } from 'express';
import { IMessageService } from '../interfaces/IChat/messageService.interface';

export class MessageController {
  private messageService: IMessageService;
  constructor(messageService: IMessageService) {
    this.messageService = messageService;
    this.getMessageByRoom = this.getMessageByRoom.bind(this);
  }

  async getMessageByRoom(req: Request, res: Response, next: NextFunction) {
    const { room_id } = req.params;
    try {
      const messages = await this.messageService.findByRoom(room_id);
      return res.json(messages);
    } catch (err) {
      next(err);
    }

  }
}
