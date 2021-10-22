
export interface IRoom {
  _id?: string;
  name: string;
  ownerId: string;
  maxConnections: number;
  last_message?: {
    content: String,
    date: Date
  };
  members: string[];
  admins: string[];
}
