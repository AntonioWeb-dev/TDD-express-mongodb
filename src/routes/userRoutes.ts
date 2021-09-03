import { Router } from 'express';
import userController from '../controllers/UserController';
const routes = Router();

routes.get('/users', userController.index);
routes.get('/users/:id', userController.show);
routes.post('/users', userController.create);
routes.delete('/users/:id', userController.delete);
routes.put('/users/:id', userController.update);



export default routes;
