import userController from './controllers/UserController';
import projectController from './controllers/ProjectController';
import authMiddleware from './middlewares/auth';
import { Router } from 'express';

const routes = new Router();



routes.post('/singup', userController.singUp);
routes.post('/login', userController.login);

routes.use(authMiddleware);

routes.post('/projects/store', projectController.store);
routes.get('/projects/index', projectController.index);


routes.get('/', async (req, res) => {
    await res.send('Hello World')
})

export default routes;