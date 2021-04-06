import Sequelize, { Model } from 'sequelize';

class NaversProject extends Model {
  static init(sequelize) {
    super.init(
      {
        navers_id: Sequelize.INTEGER,
        projects_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default NaversProject;
