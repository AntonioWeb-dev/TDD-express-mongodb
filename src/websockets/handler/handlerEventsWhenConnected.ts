import { IMessage } from '../../interfaces/IChat/message.interface';
import { ISocket } from '../../interfaces/socket.interface';
import { RoomService } from '../../service/RoomSerivice';

// joinRomm - make the join with the rooms from database
async function joinRoom(socket: ISocket, userID: string) {
  const roomService = new RoomService()
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
}

// handlerEventsWhenConnected - All logic when the client connect should be in this function
export async function handlerEventsWhenConnected(socket: ISocket) {
  if (socket.userID) {
    await joinRoom(socket, socket.userID)
  }

  socket.on("send-message", (message: IMessage) => {
    socket.to(message.room).emit("recive-message", message)
  })
}
