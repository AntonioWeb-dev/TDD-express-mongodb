import { Model } from 'mongoose';
import { IMessage, TSender } from "../interfaces/IChat/message.interface";
import { IMessageRepository } from "../interfaces/IChat/messageRepository.interface";

export class MessageRepository implements IMessageRepository {
  private messageModel: Model<IMessage>
  constructor(messageModel: Model<IMessage>) {
    this.messageModel = messageModel;
  }

  async find(filter: any): Promise<IMessage[]> {
    const messages = await this.messageModel.find(filter);
    return messages
  }

  async create(message: IMessage) {
    const newMessage = await this.messageModel.create(message);
    return newMessage
  }

  async delete(id: string) {
    const messageRemoved = await this.messageModel.find({ _id: id });
    await this.messageModel.deleteOne({ _id: id });
    return messageRemoved;
  }

  async lastMessages(room_ids: string[]) {
    const messages = this.messageModel.find({
      _id: {
        $in: room_ids,
      },
    });
    return messages;
  }

  async updateSender(senderUpdated: TSender) {
    await this.messageModel.updateMany({
      "sender._id": senderUpdated._id
    }, { "$set": { "sender": senderUpdated } });
    return true;
  }
}
