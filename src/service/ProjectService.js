import projectModel from '../models/Project';
import userModel from '../models/User';
import { Op } from 'sequelize'
class ProjectService {

    async index(projectName, userId) {

        const { name } = projectName;

        if (name) {
            const projects = await projectModel.findAll({
                where:
                {
                    [Op.and]: [
                        { name },
                        { users_id: userId }
                    ]
                },
                attributes: ['id', 'name']
            });

            return JSON.stringify(projects);
        }

        const project = await projectModel.findAll({ where: { users_id: userId }, attributes: ['id', 'name'] });

        if (!project) {
            throw new Error().stack();
        }
        return JSON.stringify(project)
    }

    async show(req, res) {
        await this;
    }

    async store(project, userId) {

        const { name } = project;
        const { id } = await userModel.findByPk(userId);

        const projectCreated = await projectModel.create({
            name,
            users_id: id
        });

        if (!projectCreated) {
            throw new Error().stack();
        }
    }

    async update(req, res) {
        await this;
    }


}

export default new ProjectService();
