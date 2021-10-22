import MessageModel from '../models/Message';
import { MessageRepository } from '../repositories/MessageRepository';
import { MessageService } from '../service/MessageService';
import { RoomService } from '../service/RoomSerivice';
import { UserService } from '../service/UserSerivice';

const messageRepository = new MessageRepository(MessageModel);

const messageService = new MessageService(messageRepository);
const userService = new UserService(messageService);
const roomService = new RoomService(userService);


export { roomService, userService, messageService };
