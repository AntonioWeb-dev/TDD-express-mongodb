import mongoose from 'mongoose';
export type TSender = {
  name: String,
  email: String,
  avatar: String | undefined,
  _id: mongoose.Types.ObjectId,
}

export type TMessage =
  'TEXT' |
  'AUDIO' |
  'DOCUMENT' |
  'VIDEO' |
  'IMAGE'

export interface IMessage {
  _id: mongoose.Types.ObjectId;
  content: string;
  sender: TSender;
  room_id: string;
  type: TMessage;
  isResponse: boolean;
  date: Date;
}

export interface IAudioFile {
  start: number;
  end: number;
  buffer: Buffer;
  _id: string;
}
