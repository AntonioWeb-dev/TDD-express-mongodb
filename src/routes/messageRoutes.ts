import { Router } from 'express';

import { MessageController } from '../controllers/MessageController';
import { authorization } from '../middleware/authorization';
import { messageService } from './injection';

const messageController = new MessageController(messageService);

const routes = Router();
routes.get('/messages/:room_id', authorization, messageController.getMessageByRoom);


export default routes;
