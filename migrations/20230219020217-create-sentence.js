'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sentences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numeroProcesso: {
        type: Sequelize.STRING
      },
      julgador: {
        type: Sequelize.STRING
      },
      teor: {
        type: Sequelize.TEXT
      },
      resultado: {
        type: Sequelize.STRING
      },
      relatorio: {
        type: Sequelize.TEXT
      },
      fundamentos: {
        type: Sequelize.TEXT
      },
      dispositivo: {
        type: Sequelize.TEXT
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sentences');
  }
};