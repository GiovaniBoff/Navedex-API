import naverModel from '../models/Naver';
import projectModel from '../models/Project';
import userModel from '../models/User';
import naverProjectModel from '../models/NaverProject';
import {Op} from 'sequelize'

class NaverService{

    async index(naverQuery, userId) {

        if (naverQuery) {
            const { name, addmissionDate, jobRole } = naverQuery;
            console.log(naverModel.findAll({
                where: {
                    [Op.or]: [
                        { name: name = undefined ? '' : name },
                        { admission_date: addmissionDate = undefined ?  '': addmissionDate },
                        { job_role:jobRole = undefined ? '' : jobRole }
                    ],
                    [Op.and]: [
                        { users_id: userId }
                    ]
                },
                attributes: ['id', 'name','birthdate','admission_date','job_role']
            }))
            const navers = await naverModel.findAll({
                where: {
                    [Op.or]: [
                        { name },
                        { admission_date: addmissionDate },
                        { job_role:jobRole }
                    ],
                    [Op.and]: [
                        { users_id: userId }
                    ]
                },
                attributes: ['id', 'name','birthdate','admission_date','job_role']
            });

            return JSON.stringify(navers);
        }


        const naver = await naverModel.findAll({ where: { users_id: userId }, attributes: ['id', 'name', 'birthdate', 'admission_date', 'job_role'] });
        
        if (!naver) {
            throw new Error().stack();
        }

        return JSON.stringify(naver)
    }

    async show(req,res){
        await this;
    }

    async store(naver, userId) {
        
        const { id } = await userModel.findByPk(userId);

        const { name,birthdate,admission_date,job_role,project } = naver;
        
        console.log(...project);

        const projectExists = await projectModel.findAll({where:{id:project}});

        console.log(projectExists.id);

        if (!projectExists) {
            throw new Error('Project not exists');
        }

        const naverCreated = await naverModel.create({
            name,
            birthdate,
            admission_date,
            job_role,
            users_id:id
        });

        if(!naverCreated){
            throw new Error().stack();
        }

        

        const naverProjectCreated = await naverProjectModel.create({
            navers_id: naverCreated.id,
            projects_id: projectExists.id
        });

        if(!naverProjectCreated){
            throw new Error().stack();
        }
    }

    async update(req,res){
        await this;
    }

}

export default new NaverService();