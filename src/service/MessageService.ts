import { IMessage } from '../interfaces/IChat/message.interface';
import { IMessageRepository } from "../interfaces/IChat/messageRepository.interface";
import { IMessageService } from "../interfaces/IChat/messageService.interface";


export class MessageService implements IMessageService {
  private messageRepository: IMessageRepository;

  constructor(messageRepository: IMessageRepository) {
    this.messageRepository = messageRepository;
  }

  async find(filter: any) {
    const result = this.messageRepository.find(filter);
    return result;
  }

  async findByRoom(room_id: string) {
    const messages = await this.messageRepository.find({ room_id });
    return messages;
  }

  async getLastMessagesByRoom(room_ids: string[]) {
    const messages = await this.messageRepository.lastMessages(room_ids);
    return messages;
  }

  async create(message: IMessage) {
    const newMessage = await this.messageRepository.create(message);
    return newMessage
  }

  async delete(id: string) {
    const messageRemoved = await this.messageRepository.delete(id);
    return messageRemoved;
  }
}
