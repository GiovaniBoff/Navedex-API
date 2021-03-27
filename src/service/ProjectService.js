import projectModel from '../models/Project';
import naverModel from '../models/Naver';
import naverProjectModel from '../models/NaversProject';
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

    async show(projectId) {
        const projectFound = await naverModel.findByPk(projectId);
        if (!projectFound) {
            throw 'Project not found';
        }
        const naverProjectFound = await naverProjectModel.findAll({ where: { projects_id: projectId } });

        const naversQuery = [];

        naverProjectFound.map((n) => {
            naversQuery.push({ id: p.projects_id });
        });

        const navers = await projectModel.findAll({
            where: {
                [Op.or]: naversQuery
            },
            attributes: ['id', 'name', 'birthdate', 'addmissionDate', 'jobRole']
        })

        const { id, name, } = projectFound;

        const project = {
            id,
            name,
            navers
        }

        return project;
    }


    async store(project, userId) {

        const { name, navers } = project;
        const { id } = await userModel.findByPk(userId);

        const queries = [];

        const projectCreated = await projectModel.create({
            name,
            users_id: id
        });

        if (!projectCreated) {
            throw new Error().stack();
        }
        const naverProjects = []
        if (navers) {

            navers.map((n) => {
                queries.push({ id: n });
            })

            const naverExists = await nave.findAll({
                where: {
                    [Op.or]: queries
                }
            });

            if (!naverExists) {
                throw new Error('Naver not exists');
            }
            naverExists.map((naver) => {
                naverProjects.push(
                    {
                        navers_id: naver.id,
                        projects_id: projectCreated.id
                    }
                )
            });

            const naverProjectCreated = await naverProjectModel.bulkCreate(naverProjects);

            if (!naverProjectCreated) {
                throw new Error().stack();
            }

            const naverWithProject = {
                name,
                navers
            }

            return naverWithProject;

        }

        return projectCreated;
    }

    async update(oldProject, newProject) {
        await this;
    }

    async deleteProject(project) { }


}

export default new ProjectService();
