
export interface IRoom {
  _id?: string;
  name: string;
  ownerId: string;
  last_message?: {
    content: String,
    date: Date
  };
  room_avatar: string | undefined;
  members: string[];
  admins: string[];
}
