import { Router } from 'express';

import MessageModel from '../models/Message';
import { MessageRepository } from '../repositories/MessageRepository';
import { MessageService } from '../service/MessageService';
import { MessageController } from '../controllers/MessageController';
import { authorization } from '../middleware/authorization';

const messageRepository = new MessageRepository(MessageModel);
const messageService = new MessageService(messageRepository);
const messageController = new MessageController(messageService);

const routes = Router();
routes.get('/messages/:room_id', authorization, messageController.getMessageByRoom);

export default routes;
