'use strict';
module.exports = {
  // Metodo de criaçãod a tabela
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ocorrencia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false
      },
      localizacao: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  //Remoção da tabela
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Ocorrencia');
  }
};
