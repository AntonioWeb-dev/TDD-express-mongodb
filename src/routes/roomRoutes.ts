import { Router } from 'express';
import { RoomController } from '../controllers/RoomController';
import { authorization } from '../middleware/authorization';
import { roomService } from './injection';
import { s3Client } from '../infra/aws/clients/S3-client';
import multer from 'multer';
import MulterConfig from '../utils/Multer';


const routes = Router();
const roomController = new RoomController(roomService, s3Client);

const fileMiddleware = multer(MulterConfig)

routes.get('/rooms', authorization, roomController.index);
routes.get('/rooms/:id', authorization, roomController.show);
routes.post('/rooms', authorization, fileMiddleware.single('avatar'), roomController.create);
routes.delete('/rooms/:id', authorization, roomController.delete);
routes.put('/rooms/:id', authorization, roomController.update);
routes.put('/rooms/newmember/:roomID', authorization, roomController.newMember);
routes.delete('/rooms/:roomID/members', authorization, roomController.removeMember);


export default routes;
