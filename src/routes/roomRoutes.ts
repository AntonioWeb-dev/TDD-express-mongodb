import { Router } from 'express';
import roomController from '../controllers/RoomController';
const routes = Router();

routes.get('/rooms', roomController.index);
routes.get('/rooms/:id', roomController.show);
routes.post('/rooms', roomController.create);
routes.delete('/rooms/:id', roomController.delete);
routes.put('/rooms/:id', roomController.update);



export default routes;
