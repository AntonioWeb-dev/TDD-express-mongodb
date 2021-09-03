import { Schema, model } from 'mongoose';
import { IRoom } from '../interfaces/room.interface';

const roomSchema = new Schema<IRoom>({
  ownerId: {
    type: String,
    required: true,
  },
  maxConnections: {
    type: Number,
    default: 0,
    min: [0, 'The numbers of connections has to be > 0'],
  }
});

const RoomModel = model<IRoom>('Rooms', roomSchema);
export default RoomModel;

