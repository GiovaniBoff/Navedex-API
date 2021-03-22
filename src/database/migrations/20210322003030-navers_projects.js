'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('navers_projects',{
      id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey:true
      },
      naversId:{
        type:Sequelize.INTEGER,
        references:{
          model:{
            tableName:'navers'
          },
          key: 'id'
        },
        allowNull:false
      },
      projectsId:{
        type:Sequelize.INTEGER,
        references:{
          model:{
            tableName:'projects'
          },
          key: 'id'
        },
        allowNull:false
      },


    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('navers_projects')
  }
};
