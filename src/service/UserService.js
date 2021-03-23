import UserModel from '../models/User';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
class UserService {

    async singUp(req, res) {

        try {
            const { password, email, name } = req.body;

            const userExists = await UserModel.findOne({ where: { email:email } });

            if (userExists) {
                return res.status(400).json({ error: 'User already exists' });
            }

            await UserModel.create({
                name,
                email,
                password
            })
            return res.status(201).send();
        } catch (err) {
            res.status(401).json({ error: err });
        }

    }
    async login(req, res) {
       
        const { email, password } = req.body;

        const user = await UserModel.findOne({ where: { email:email } });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        const checkedPassword = await user.checkPassword(password);

        if (!checkedPassword) {
            return res.status(401).json({ error: 'Password doesnt match' });
        }

        const { id } = user;

        return res.json({
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expires
            })
        });

    }
}

export default new UserService();