import { json, Op, where } from 'sequelize';
import moment, { utc } from 'moment-timezone';
import naverModel from '../models/Naver';
import projectModel from '../models/Project';
import userModel from '../models/User';
import naverProjectModel from '../models/NaversProject';

class NaverService {
  async index(naverQuery, users_id) {
    const queries = [];
    const configQuery = {
      where: {},
      attributes: ['id', 'name', 'birthdate', 'admission_date', 'job_role'],
    };

    if (naverQuery != undefined) {
      const { name, companyTime, jobRole } = naverQuery;

      if (name) {
        queries.push({ name });
      }
      if (companyTime) {
        queries.push({
          admission_date: {
            [Op.lt]: moment().subtract(companyTime, 'years'),
          },
        });
      }
      if (jobRole) {
        queries.push({ job_role: jobRole });
      }

      configQuery.where[Op.and] = [{ users_id }, queries];

      const navers = await naverModel.findAll(configQuery);

      return navers;
    }

    configQuery.where = { users_id };

    const naver = await naverModel.findAll(configQuery);

    if (!naver) {
      throw new Error().stack();
    }

    return naver;
  }

  async show(naverId, user_id) {
    const naverFound = await naverModel.findByPk(naverId, {
      where: { user_id },
    });

    if (!naverFound) {
      throw Error('Naver not found');
    }

    const naverProjectFound = await naverProjectModel.findAll({
      where: { navers_id: naverFound.id },
    });

    if (!naverProjectFound) {
      throw new Error('Naver projects not found');
    }

    const projectsQuery = [];

    naverProjectFound.map((p) => {
      projectsQuery.push({ id: p.projects_id });
    });

    const projects = await projectModel.findAll({
      where: {
        [Op.or]: projectsQuery,
      },
      attributes: ['id', 'name'],
    });

    const { id, name, birthdate, admission_date, job_role } = naverFound;

    const naver = {
      id,
      name,
      birthdate,
      admission_date,
      job_role,
      projects,
    };
    return naver;
  }

  async store(naver, userId) {
    const { id } = await userModel.findByPk(userId);
    const { name, birthdate, admission_date, job_role, projects } = naver;
    const queries = [];

    const naverCreated = await naverModel.create({
      name,
      birthdate,
      admission_date,
      job_role,
      users_id: id,
    });

    if (!naverCreated) {
      throw new Error().stack();
    }

    const naverProjects = [];
    if (projects) {
      projects.map((p) => {
        queries.push({ id: p });
      });

      const projectExists = await projectModel.findAll({
        where: {
          [Op.or]: queries,
        },
      });

      if (!projectExists) {
        throw new Error('Project not exists');
      }
      projectExists.map((project) => {
        naverProjects.push({
          navers_id: naverCreated.id,
          projects_id: project.id,
        });
      });

      const naverProjectCreated = await naverProjectModel.bulkCreate(
        naverProjects
      );

      if (!naverProjectCreated) {
        throw new Error().stack();
      }

      const naverWithProject = {
        name,
        birthdate,
        admission_date,
        job_role,
        projects,
      };

      return naverWithProject;
    }

    return {
      name,
      birthdate,
      admission_date,
      job_role,
    };
  }

  async update(naver, userId) {
    const { id, name, birthdate, admission_date, job_role, projects } = naver;
    const updates = [];

    const naverFound = await naverModel.findByPk(id, {
      where: { users_id: userId },
    });

    if (!naverFound) {
      throw new Error('Naver not found');
    }

    if (name) {
      updates.push({ name });
    }
    if (birthdate) {
      updates.push({ birthdate: Date.parse(birthdate) });
    }

    if (admission_date) {
      updates.push({ admission_date: Date.parse(admission_date) });
    }

    if (job_role) {
      updates.push({ job_role });
    }

    await naverFound.update(...updates);

    const queries = [];
    const naverProjects = [];
    if (projects) {
      projects.map((p) => {
        queries.push({ id: p });
      });

      const projectExists = await projectModel.findAll({
        where: {
          [Op.or]: queries,
        },
      });

      if (!projectExists) {
        throw new Error('Project not exists');
      }
      projectExists.map((project) => {
        naverProjects.push({
          navers_id: id,
          projects_id: project.id,
        });
      });

      naverProjects.map(async (item) => {
        await naverProjectModel.findOrCreate({
          where: item,
        });
      });
    }

    return await this.show(id, userId);
  }

  async deleteNaver(naverId, userId) {
    const naver = await naverModel.findOne({
      where: { users_id: userId, id: naverId },
    });

    if (!naver) {
      throw new Error('Naver already deleted');
    }

    await naverProjectModel.destroy({ where: { navers_id: naverId } });

    naver.destroy();

    return {
      message: 'Naver sucessfully deleted',
    };
  }
}

export default new NaverService();
