'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users',{
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
      email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      password:{
        type:Sequelize.STRING,
        allowNull:false
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
    await queryInterface.dropTable('users');
  }
};
