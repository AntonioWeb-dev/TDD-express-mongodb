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
      id: String,
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
}, {
  timestamps: {
    createdAt: true,
  }
});

const MessageModel = model<IMessage>('messages', messageSchema);
export default MessageModel;
