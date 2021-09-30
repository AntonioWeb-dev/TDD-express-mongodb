export interface IRoom {
  _id?: string;
  name: string;
  ownerId: string;
  maxConnections: number;
  members: string[];
  admins: string[];
}
