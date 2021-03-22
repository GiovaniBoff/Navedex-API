import User from '../models/User';

export default async (req, res, next) => {
    const { password } = req.body;

    if (!password) {
        return res.status(401).json({ error: 'Password not provided' });
    }


    try {

        const user = await User.findByPk(req.userId);

        const checkPassword = await user.checkPassword(password);

        if (!checkPassword) {
            return res.status(401).json({ error: 'Password not match' });
        }

    } catch (err) {
        res.status(401).json({ error: err });
    }
}