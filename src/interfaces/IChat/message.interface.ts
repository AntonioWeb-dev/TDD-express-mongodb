import { IUser } from "../IUser/user.interface";

export interface IMessage {
  _id?: string;
  content: string;
  sender: IUser;
  room_id: string;
  isResponse: boolean;
  created_at: Date;
}
