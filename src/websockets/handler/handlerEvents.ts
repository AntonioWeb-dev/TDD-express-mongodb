import { IMessage } from '../../interfaces/IChat/message.interface';
import { ISocket } from '../../interfaces/socket.interface';
import { RoomService } from '../../service/RoomSerivice';


async function joinRoom(socket: ISocket, userID: string) {
  const roomService = new RoomService()
  const rooms = await roomService.findRoomByMemberID(userID)
  const roomIDS = rooms.map(room => {
    return room._id
  });
  for (let room of roomIDS) {
    if (room) {
      socket.join(room.toString())
    }
  }
}



export async function handlerEvents(socket: ISocket) {
  console.log(socket.rooms)
  if (socket.userID) {
    await joinRoom(socket, socket.userID)
  }



  socket.on("send-message", (message: IMessage) => {
    console.log(message)
    socket.to(message.room).emit("recive-message", message)
  })
}
