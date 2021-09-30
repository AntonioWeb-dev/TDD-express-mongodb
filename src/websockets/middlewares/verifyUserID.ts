import { ISocket } from '../../interfaces/socket.interface'

export const verifyUserID = (socket: ISocket, next: Function) => {
  const userID = socket.handshake.auth.userID
  socket.userID = userID;
  if (!userID) {
    return next(new Error("unauthorized event"))
  }
  next()
}
