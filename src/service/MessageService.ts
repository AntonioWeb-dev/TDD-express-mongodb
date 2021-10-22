import { IMessage, TSender } from '../interfaces/IChat/message.interface';
import { IMessageRepository } from "../interfaces/IChat/messageRepository.interface";
import { IMessageService } from "../interfaces/IChat/messageService.interface";
import CustomError from '../utils/CustomError';


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
    const messages = await this.messageRepository.find({ room_id })
      .catch((err) => {
        console.log(err);
        return [];
      })
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

  async updateSender(sender: TSender) {
    try {
      await this.messageRepository.updateSender(sender);
    } catch (err) {
      console.log(err);
      throw new CustomError('Server error', 500);
    }
  }
}
