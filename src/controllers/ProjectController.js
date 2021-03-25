import projectService from '../service/ProjectService';

class ProjectController{

    async index(req, res) {
        try {
            const projectName = req.query;
            const userId = req.userId;

            const project =  await projectService.index(projectName,userId);

            res.status(200).send(JSON.parse(project));

        } catch (error) {
            res.status(400).json({ error });
        }
    }
    async store(req, res) {
        try {
            const userId = req.userId;
            
            const project = req.body;

            await projectService.store(project, userId);

            res.status(200).send();
        } catch (error) {
            res.status(400).json({ error });
        }
    }


}

export default new ProjectController();
