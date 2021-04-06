import projectModel from '../models/Project';
import naverModel from '../models/Naver';
import naverProjectModel from '../models/NaversProject';
import userModel from '../models/User';
import { Op } from 'sequelize'

class ProjectService {

    async index(projectName, users_id) {

        const { name } = projectName;

        if (name) {
            const projects = await projectModel.findAll({
                where:
                {
                    [Op.and]: [
                        { name },
                        { users_id }
                    ]
                },
                attributes: ['id', 'name']
            });

            return JSON.stringify(projects);
        }

        const project = await projectModel.findAll({ where: { users_id }, attributes: ['id', 'name'] });

        if (!project) {
            throw new Error().stack();
        }
        return project
    }

    async show(projectId, users_id) {
        const projectFound = await projectModel.findByPk(projectId, { where: { users_id } });

        if (!projectFound) {
            throw new Error();
        }
        const naverProjectFound = await naverProjectModel.findAll({ where: { projects_id: projectFound.id } });

        const naversQuery = [];

        naverProjectFound.map((n) => {
            naversQuery.push({ id: n.navers_id });
        });

        const navers = await naverModel.findAll({
            where: {
                [Op.or]: naversQuery
            },
            attributes: ['id', 'name', 'job_role', 'birthdate', 'admission_date']
        })

        const { id, name } = projectFound;

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

            const naverExists = await naverModel.findAll({
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
                id: projectCreated.id,
                name: projectCreated.name,
                navers
            }

            return naverWithProject;

        }

        return {
            id: projectCreated.id,
            name: projectCreated.name
        }
    }

    async update(project, users_id) {
        const { id, name, navers } = project;
        const updates = [];

        const projectFound = await projectModel.findByPk(id, { where: { users_id } });

        if (!projectFound) {
            throw new Error('Project not found');
        }

        if (name) {
            updates.push({ name });
        }

        await projectFound.update(...updates);

        const queries = [];
        const naverProjects = [];

        if (navers) {

            navers.map((n) => {
                queries.push({ id: n });
            })

            const naverExists = await naverModel.findAll({
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
                        projects_id: id
                    }
                )
            });

            naverProjects.map(async (item) => {
                await naverProjectModel.findOrCreate({
                    where: item
                });
            });

        }

        return await this.show(id, users_id);


    }

    async delete(projectId, users_id) {
        const project = await projectModel.findOne({ where: { users_id, id: projectId } });

        if (!project) {
            throw new Error('Project already deleted');
        }

        await naverProjectModel.destroy({ where: { projects_id: project.id } });

        project.destroy()

        return {
            message: 'Project sucessfully deleted'
        }
    }
}

export default new ProjectService();
