import { IMessageService } from '../../interfaces/IChat/messageService.interface';
import { ISocket } from '../../interfaces/socket.interface';

export function roomMessages(socket: ISocket, messageService: IMessageService) {
  socket.on("room-member-left", async ({ message: IRoomLeft }) => {

  });
}
