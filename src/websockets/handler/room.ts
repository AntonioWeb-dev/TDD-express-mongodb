import { IMessageService } from '../../interfaces/IChat/messageService.interface';
import { ISocket } from '../../interfaces/socket.interface';

export function roomMessages(socket: ISocket, messageService: IMessageService) {
  socket.on("room", async (room_id: string) => {
    const messages = await messageService.findByRoom(room_id);
    socket.to(room_id).emit("room-messages", messages);
  });
}
