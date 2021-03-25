import naverService from '../service/NaverService';

class NaverController{

    async index(req, res) {
        try {
            const query = req.query;

            const userId = req.userId;
            const naver =  await naverService.index(query,userId);

            res.status(200).send(JSON.parse(naver));

        } catch (error) {
            res.status(400).json({ error });
        }
    }
    async store(req, res) {
        try {
            const userId = req.userId;
            
            const naver = req.body;

            await naverService.store(naver, userId);

            res.status(200).send();

        } catch (error) {
            res.status(400).json({ error });
        }
    }
}

export default new NaverController();
