import { IMessage } from '../../interfaces/IChat/message.interface';
import { IMessageService } from '../../interfaces/IChat/messageService.interface';
import { ISocket } from '../../interfaces/socket.interface';

export function sendMessage(socket: ISocket, messageService: IMessageService) {
  socket.on("send-message", async (message: IMessage) => {
    const newMessage = await messageService.create(message);
    socket.to(message.room_id).emit("recive-message", newMessage);
  });
}
