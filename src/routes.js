import { Router } from 'express';
import userController from './controllers/UserController';
import naverController from './controllers/NaverController';
import projectController from './controllers/ProjectController';
import authMiddleware from './middlewares/auth';

const routes = new Router();

routes.post('/singup', userController.singUp);
routes.post('/login', userController.login);

routes.use(authMiddleware);

routes.post('/projects', projectController.store);
routes.get('/projects', projectController.index);
routes.get('/projects/:id', projectController.show);

routes.patch('/projects', projectController.update);

routes.delete('/projects/:id', projectController.delete);

routes.post('/navers', naverController.store);

routes.get('/navers', naverController.index);
routes.get('/navers/:id', naverController.show);

routes.patch('/navers', naverController.update);

routes.delete('/navers/:id', naverController.delete);

export default routes;
