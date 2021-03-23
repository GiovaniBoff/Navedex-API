import UserController from './controllers/UserController';
import authMiddleware from './middlewares/auth';
import { Router } from 'express';

const routes = new Router();



routes.post('/singup', UserController.singUp);
routes.post('/login', UserController.login);

routes.use(authMiddleware);
routes.get('/', async (req, res) => {
    await res.send('Hello World')
})

export default routes;