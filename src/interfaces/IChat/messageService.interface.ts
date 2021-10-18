import { IMessage } from './message.interface';

export interface IMessageService {
  find(filter: any): Promise<IMessage[]>;
  findByRoom(room_id: string): Promise<IMessage[]>;
  create(message: IMessage): Promise<IMessage>;
  delete(id: string): Promise<IMessage[]>;
}
