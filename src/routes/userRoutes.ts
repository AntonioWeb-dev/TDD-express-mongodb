import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { UserService } from '../service/UserSerivice';
const routes = Router();

const userController = new UserController(new UserService());

routes.get('/users', userController.index);
routes.get('/users/:id', userController.show);
routes.post('/users', userController.create);
routes.delete('/users/:id', userController.delete);
routes.put('/users/:id', userController.update);



export default routes;
