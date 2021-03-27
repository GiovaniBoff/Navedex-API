import naverService from '../service/NaverService';

class NaverController {

    async index(req, res) {
        try {
            const query = req.query;

            const userId = req.userId;
            const naver = await naverService.index(query, userId);

            res.status(200).json(naver);

        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    async store(req, res) {
        try {
            const userId = req.userId;
            const naver = req.body;

            const userCreated = await naverService.store(naver, userId);
            res.status(200).json(userCreated);

        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    async show(req, res) {
        try {
            const naverId = req.params.id;
            const userId = req.userId;

            const naver = await naverService.show(naverId, userId);
            res.status(200).json(naver);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }

    async update(req, res) {
        try {
            const naverUpdate = req.body;          
            const userId = req.userId;

            const naver = await naverService.update(naverUpdate,userId);
            res.status(200).json(naver);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
        
    }
    async delete(req, res) {
        try {
            const naverId = req.params.id;
            const userId = req.userId;

            const naver = naverService.deleteNaver(naverId,userId);
            res.status(200).json(naver);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }

}

export default new NaverController();
