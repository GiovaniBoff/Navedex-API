import userModel from '../models/User';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
class UserService {

    async singUp(user) {
        const { password, email, name } = user;

        const userExists = await userModel.findOne({ where: { email } });

        if (userExists) {
            throw 'User already exists';
        }
        await userModel.create({
            name,
            email,
            password
        })
    }
    async login(user) {

        const { email, password } = user;

        const userFound = await userModel.findOne({ where: { email } });

        if (!user) {
            throw 'User not found'
        }

        const checkedPassword = await userFound.checkPassword(password);

        if (!checkedPassword) {
            throw 'Password doesnt match';
        }

        const { id } = userFound;

        return JSON.stringify({
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expires
            })
        });

    }

    async update(userId, project) {

    }
}

export default new UserService();