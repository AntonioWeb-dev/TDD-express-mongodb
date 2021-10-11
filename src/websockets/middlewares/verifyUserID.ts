import { ISocket } from '../../interfaces/socket.interface'

// verifyUserID - is a middleware that add a value in socket.userID from the handshake auth
export const verifyUserID = (socket: ISocket, next: Function) => {
  const userID = socket.handshake.auth.userID
  socket.userID = userID;
  if (!userID) {
    return next(new Error("unauthorized event"))
  }
  next()
}
