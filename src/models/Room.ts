import mongoose, { Schema, model } from 'mongoose';
import { IRoom } from '../interfaces/IRoom/room.interface';

const roomSchema = new Schema<IRoom>({
  ownerId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  admins: [{
    type: String,
  }],
  members: [{
    type: String,
  }],
  room_avatar: {
    type: String,
    default: 'undefined'
  },
  last_message: {
    type: {
      content: String,
      date: Date,
    },
    default: {},
  },
});

const RoomModel = model<IRoom>('Rooms', roomSchema);
export default RoomModel;

