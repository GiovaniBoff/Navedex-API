import jwt from 'jsonwebtoken';
import userModel from '../models/User';
import authConfig from '../config/auth';

class UserService {
  async singUp(user) {
    const { password, email, name } = user;

    const userExists = await userModel.findOne({ where: { email } });

    if (userExists) {
      throw new Error('User already exists');
    }
    await userModel.create({
      name,
      email,
      password,
    });
  }

  async login(user) {
    const { email, password } = user;

    const userFound = await userModel.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const checkedPassword = await userFound.checkPassword(password);

    if (!checkedPassword) {
      throw new Error('Password doesnt match');
    }

    const { id } = userFound;

    return {
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expires,
      }),
    };
  }
}

export default new UserService();
