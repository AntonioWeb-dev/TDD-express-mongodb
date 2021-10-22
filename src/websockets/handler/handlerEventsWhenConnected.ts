import { IRoomService } from '../../interfaces/IRoom/roomService.interface';
import { ISocket } from '../../interfaces/socket.interface';
import MessageModel from '../../models/Message';
import { MessageRepository } from '../../repositories/MessageRepository';
import { messageService, roomService } from '../../routes/injection';
import { MessageService } from '../../service/MessageService';
import { RoomService } from '../../service/RoomSerivice';
import { roomMessages } from './room';
import { sendMessage } from './sendMessage';

// joinRomm - make the join with the rooms from database
async function joinRoom(socket: ISocket, userID: string, roomService: IRoomService) {
  const rooms = await roomService.findRoomByMemberID(userID)
  const roomIDS = rooms.map(room => {
    return room._id
  });
  for (let room of roomIDS) {
    if (room) {
      //isUsed toString() because the IDs are objectId and we need to convert to string
      socket.join(room.toString())
    }
  }
  return rooms;
}

// handlerEventsWhenConnected - All logic when the client connect should be in this function
export function handlerEventsWhenConnected(io: any) {

  io.on('connect', async (socket: ISocket) => {

    let rooms: any[] = []
    if (socket.userID) {
      rooms = await joinRoom(socket, socket.userID, roomService);
    }
    socket.emit('yourRooms', rooms);


    roomMessages(socket, messageService);
    sendMessage(socket, messageService, roomService);

  })

}
