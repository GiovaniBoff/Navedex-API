import UserService from '../service/UserService'

class UserControler {

    async singUp(req, res) {
        await UserService.singUp(req, res);
    }

    async login(req, res) {
        await UserService.login(req, res);
    }

}

export default new UserControler();