import Sequelize from 'sequelize';
import User from '../models/User';
import Project from '../models/Project';
import databaseConfig from './database';

const models = [User,Project];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models.map((model) => model.init(this.connection));
    }
}

export default new Database();