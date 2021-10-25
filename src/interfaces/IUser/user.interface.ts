import mongoose from 'mongoose';

export type TContact = {
  _id: string,
  last_message: {
    content: String,
    date: Date
  } | undefined,
}

export interface IUser {
  name: string;
  password?: string;
  email: string;
  avatar: string | undefined;
  contacts: TContact[];
  _id?: string;
}
