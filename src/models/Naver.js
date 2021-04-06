import moment from 'moment-timezone';
import Sequelize, { Model } from 'sequelize';

class Naver extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        birthdate: {
          type: Sequelize.DATE,
          get() {
            return moment(this.getDataValue('birthdate')).format('YYYY-MM-DD');
          },
        },
        admission_date: {
          type: Sequelize.DATE,
          get() {
            return moment(this.getDataValue('admission_date')).format(
              'YYYY-MM-DD'
            );
          },
        },
        job_role: Sequelize.STRING,
        users_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}
export default Naver;
