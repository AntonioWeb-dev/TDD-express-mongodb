import { Router } from 'express';
import { RoomController } from '../controllers/RoomController';
import { RoomService } from '../service/RoomSerivice';
import { authorization } from '../middleware/authorization';


const routes = Router();
const roomController = new RoomController(new RoomService());

routes.get('/rooms', authorization, roomController.index);
routes.get('/rooms/:id', authorization, roomController.show);
routes.post('/rooms', authorization, roomController.create);
routes.delete('/rooms/:id', authorization, roomController.delete);
routes.put('/rooms/:id', authorization, roomController.update);
routes.put('/rooms/newMember/:roomID', authorization, roomController.newMember);

export default routes;
