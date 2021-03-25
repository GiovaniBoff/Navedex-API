import userService from '../service/UserService'

class UserControler {

    async singUp(req, res) {
        try {
            const user = req.body;

            await userService.singUp(user);

            res.status(201).send();

        }catch (error){
            res.status(400).json({ error });
        }
        
    }

    async login(req, res) {
        try {
            const user = req.body;

            const json = await userService.login(user);
            
            res.status(200).json(JSON.parse(json));

        } catch (error) {
            res.status(400).json({ error });
        }
        
    }
}

export default new UserControler();