import { IMessage } from '../../interfaces/IChat/message.interface';
import { IMessageService } from '../../interfaces/IChat/messageService.interface';
import { ISocket } from '../../interfaces/socket.interface';
import mongoose from 'mongoose';

export function sendMessage(socket: ISocket, messageService: IMessageService) {
  socket.on("send-message", async (message: IMessage) => {
    message._id = new mongoose.Types.ObjectId(message._id)
    const newMessage = await messageService.create(message);
    socket.to(message.room_id).emit("recive-message", newMessage);
  });
}
