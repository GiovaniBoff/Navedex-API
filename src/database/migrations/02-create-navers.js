'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('navers',{
      id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey:true
      },
      name:{
        type:Sequelize.STRING,
        allowNull:false
      },
      birthdate:{
        type:Sequelize.DATE,
        allowNull:false
      },
      admission_date:{
        type:Sequelize.DATE,
        allowNull:false
      },
      job_role:{
        type:Sequelize.STRING,
        allowNull:false
      },
      users_id:{
        type:Sequelize.INTEGER,
        references:{
          model:{
            tableName:'users'
          },
          key: 'id'
        },
        allowNull:true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    
  })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('navers');
  }
};
