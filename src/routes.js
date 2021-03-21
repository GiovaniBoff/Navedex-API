import { Router } from 'express';


const routes = new Router();

routes.get('/', async (req, res) => {
    await res.send('Hello World')
})

export default routes;