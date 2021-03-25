import Sequelize,{Model} from 'sequelize';


class NaverProject extends Model{
    static init(sequelize){
        super.init(
            {
                users_id: Sequelize.INTEGER,
                projects_id: Sequelize.INTEGER
            },
            {
                sequelize
            }
        );
        return this;
    }
}

export default NaverProject;