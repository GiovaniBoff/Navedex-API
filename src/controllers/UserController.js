import userService from '../service/UserService'

class UserControler {

    async singUp(req, res) {
        try {
            const user = req.body;

            await userService.singUp(user);

            res.status(201).send();

        }catch (e){
            res.status(400).json({ error: e.message });
        }
        
    }

    async login(req, res) {
        try {
            const user = req.body;

            const token = await userService.login(user);
            
            res.status(200).json(token);

        } catch (e) {
            res.status(400).json({ error: e.message });
        }
        
    }
}

export default new UserControler();