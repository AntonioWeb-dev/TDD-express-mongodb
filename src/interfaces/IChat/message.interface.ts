export type TSender = {
  name: String,
  email: String,
  avatar: String | undefined,
  id: String,
}

export interface IMessage {
  _id?: string;
  content: string;
  sender: TSender;
  room_id: string;
  isResponse: boolean;
  date: Date;
}
