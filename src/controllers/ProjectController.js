import projectService from '../service/ProjectService';

class ProjectController{

    async index(req, res) {
        try {
            const projectName = req.query;
            const userId = req.userId;

            const project =  await projectService.index(projectName,userId);

            res.status(200).send(JSON.parse(project));

        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    async store(req, res) {
        try {
            const userId = req.userId;
            
            const project = req.body;

            await projectService.store(project, userId);

            res.status(200).send();
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    async show(req, res) {
        try {
            const projectId = req.params.id;
            const userId = req.userId;
            const project = await projectService.show(projectId, userId);
      
            res.status(200).json(project);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    async delete(req, res) {
        const projectId = req.params.id;
        const userId = req.userId;
        try {
            const project = await projectService.delete(projectId,userId);
            res.status(200).json(project);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
    async update(req, res) {
        try {
            const projectUpdate = req.body;          
            const userId = req.userId;

            const project = await projectService.update(projectUpdate,userId);
            res.status(200).json(project);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
        
    }

}

export default new ProjectController();
