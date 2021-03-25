import Sequelize,{Model} from 'sequelize';


class Naver extends Model{
    static init(sequelize){
        super.init(
            {
                name: Sequelize.STRING,
                birthdate: Sequelize.DATE,
                admission_date:Sequelize.DATE,
                job_role:Sequelize.STRING,
                users_id: Sequelize.INTEGER
            },
            {
                sequelize
            }
        );
        return this;
    }
}

export default Naver;