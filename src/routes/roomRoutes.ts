import { Router } from 'express';
import { RoomController } from '../controllers/RoomController';
import { RoomService } from '../service/RoomSerivice';

const routes = Router();
const roomController = new RoomController(new RoomService());

routes.get('/rooms', roomController.index);
routes.get('/rooms/:id', roomController.show);
routes.post('/rooms', roomController.create);
routes.delete('/rooms/:id', roomController.delete);
routes.put('/rooms/:id', roomController.update);
routes.put('/rooms/newMember/:roomID', roomController.newMember);




export default routes;
