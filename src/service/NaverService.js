import naverModel from '../models/Naver';
import projectModel from '../models/Project';
import userModel from '../models/User';
import naverProjectModel from '../models/NaversProject';
import { Op } from 'sequelize'

class NaverService {

    async index(naverQuery, users_id) {

        const queries = [];
        const configQuery = {
            where: {},
            attributes: ['id', 'name', 'birthdate', 'admission_date', 'job_role'],
        }

        if (naverQuery != undefined) {
            const { name, addmissionDate, jobRole } = naverQuery;

            if (name) {
                queries.push({ name })
            }
            if (addmissionDate) {
                queries.push({ admission_date: addmissionDate })
            }
            if (jobRole) {
                queries.push({ job_role: jobRole });
            }

            configQuery.where[Op.and] = [
                { users_id },
                queries
            ];


            const navers = await naverModel.findAll(configQuery);

            return navers;
        }

        configQuery.where = { users_id }

        const naver = await naverModel.findAll(configQuery);

        if (!naver) {
            throw new Error().stack();
        }

        return naver;
    }

    async show(naver) {
        const naverFound = await naverModel.findByPk(naver);

    }

    async store(naver, userId) {

        const { id } = await userModel.findByPk(userId);
        const { name, birthdate, admission_date, job_role, project } = naver;
        const queries = [];



        const naverCreated = await naverModel.create({
            name,
            birthdate,
            admission_date,
            job_role,
            users_id: id
        });

        if (!naverCreated) {
            throw new Error().stack();
        }

        const naverProjects = []
        if (project) {

            project.map((p) => {
                queries.push({ id: p });
            })

            const projectExists = await projectModel.findAll({
                where: {
                    [Op.or]: queries
                }
            });

            if (!projectExists) {
                throw new Error('Project not exists');
            }
            projectExists.map((project) => {
                naverProjects.push(
                    {
                        navers_id: naverCreated.id,
                        projects_id: project.id
                    }
                )
            });

            const naverProjectCreated = await naverProjectModel.bulkCreate(naverProjects);

            if (!naverProjectCreated) {
                throw new Error().stack();
            }

            const naverWithProject = {
                name,
                birthdate,
                admission_date,
                job_role,
                project
            }

            return naverWithProject;

        }

        return naverCreated;


    }

    async update(req, res) {
        await this;
    }



}

export default new NaverService();