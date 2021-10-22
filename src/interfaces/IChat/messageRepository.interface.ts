import { IMessage, TSender } from './message.interface';

export interface IMessageRepository {
  find(filter: any): Promise<IMessage[]>;
  create(message: IMessage): Promise<IMessage>;
  delete(id: string): Promise<IMessage[]>;
  lastMessages(room_ids: string[]): Promise<IMessage[]>
  updateSender(sender: TSender): Promise<boolean>;
}
