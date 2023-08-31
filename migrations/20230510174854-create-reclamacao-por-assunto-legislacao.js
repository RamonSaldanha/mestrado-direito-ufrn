'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReclamacaoPorAssuntoLegislacaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reclamacaoPorAssuntoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'reclamacoesporassuntos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      legislacaoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'legislacaos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ReclamacaoPorAssuntoLegislacaos');
  }
};