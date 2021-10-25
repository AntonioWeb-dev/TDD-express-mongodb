import mongoose from 'mongoose';

type TContact = {
  _id: mongoose.Types.ObjectId,
  last_message?: {
      content: String,
      date: Date
    },
}

export interface IUser {
  name: string;
  password?: string;
  email: string;
  avatar: string | undefined;
  contacts: TContact[];
  _id?: string;
}
