import mongoose from 'mongoose';

export type TSender = {
  name: String,
  email: String,
  avatar: String | undefined,
  _id: mongoose.Types.ObjectId,
}

export interface IMessage {
  _id: mongoose.Types.ObjectId;
  content: string;
  sender: TSender;
  room_id: string;
  isResponse: boolean;
  date: Date;
}
