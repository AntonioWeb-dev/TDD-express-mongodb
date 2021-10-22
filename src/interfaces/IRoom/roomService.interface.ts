import { IRoom } from './room.interface';

type TLastMessage = {
  content: string;
  date: Date;
}

export interface IRoomService {
  create(room: IRoom): Promise<IRoom>;
  show(id: string): Promise<IRoom>;
  index(): Promise<IRoom[]>;
  update(id: string, data: IRoom): Promise<IRoom>;
  delete(id: string): Promise<IRoom>;
  addMember(userID: string, roomID: string): Promise<IRoom>
  findRoomByMemberID(userID: string): Promise<IRoom[]>
  updateLastMessage(id: string, message: TLastMessage): Promise<void>;
}
