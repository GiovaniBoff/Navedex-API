import {Model} from 'objection';
import knex from ''
Model.knex()

class User extends Model{
    static get tableName(){
        return 'users';
    }
}

export default User;