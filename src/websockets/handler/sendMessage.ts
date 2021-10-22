import { IMessage } from '../../interfaces/IChat/message.interface';
import { IMessageService } from '../../interfaces/IChat/messageService.interface';
import { ISocket } from '../../interfaces/socket.interface';
import mongoose from 'mongoose';
import { IRoomService } from '../../interfaces/IRoom/roomService.interface';

export function sendMessage(socket: ISocket, messageService: IMessageService, roomService: IRoomService) {
  socket.on("send-message", async (message: IMessage) => {
    try {
      message._id = new mongoose.Types.ObjectId(message._id)
      const newMessage = await messageService.create(message);
      const { content, date } = message;
      await roomService.updateLastMessage(message.room_id, { content, date });
      socket.to(message.room_id).emit("recive-message", newMessage);
    } catch (err) {
      socket.to(message.room_id).emit("send-message-error", { error: true });
    }
  });
}
