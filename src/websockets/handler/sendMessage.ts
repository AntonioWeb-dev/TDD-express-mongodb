import mongoose from 'mongoose';
import { IMessage, IAudioFile } from '../../interfaces/IChat/message.interface';
import { IMessageService } from '../../interfaces/IChat/messageService.interface';
import { ISocket } from '../../interfaces/socket.interface';
import { IRoomService } from '../../interfaces/IRoom/roomService.interface';
import { s3Client } from '../../infra/aws/clients/S3-client';
import { UploadBuffer } from '../../infra/aws/services/S3/uploadBuffer';

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

  socket.on('audio-message', async (audioMessage: IMessage, audioBuufer: Buffer, time: number) => {
    try {
      const audioURL = await UploadBuffer(s3Client, audioBuufer);

      audioMessage.content = audioURL;
      audioMessage._id = new mongoose.Types.ObjectId(audioMessage._id);
      const newMessage = await messageService.create(audioMessage);

      const { date } = audioMessage;
      await roomService.updateLastMessage(audioMessage.room_id, { content: 'audio', date });

      socket.to(audioMessage.room_id).emit("recive-message", newMessage);
    } catch (err) {
      console.log(err)
    }

  });
}
