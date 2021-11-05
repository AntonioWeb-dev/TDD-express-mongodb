import { Schema, model } from 'mongoose';
import { IMessage } from '../interfaces/IChat/message.interface';


const messageSchema = new Schema<IMessage>({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: {
      name: String,
      email: String,
      avatar: String || undefined,
    },
    required: true,
  },
  room_id: {
    type: String,
    required: true,
  },
  isResponse: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    default: "TEXT",
  },
  date: {
    type: Date,
    required: true,
  }
});

const MessageModel = model<IMessage>('messages', messageSchema);
export default MessageModel;
