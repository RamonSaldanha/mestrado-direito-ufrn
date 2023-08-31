'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reclamacoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      regiao: {
        type: Sequelize.STRING
      },
      UF: {
        type: Sequelize.STRING
      },
      cidade: {
        type: Sequelize.STRING
      },
      faixaEtaria: {
        type: Sequelize.STRING
      },
      dataFinalizacao: {
        type: Sequelize.DATE
      },
      tempoResposta: {
        type: Sequelize.INTEGER
      },
      nomeFantasia: {
        type: Sequelize.STRING
      },
      segmento: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.STRING
      },
      assunto: {
        type: Sequelize.STRING
      },
      grupoProblema: {
        type: Sequelize.STRING
      },
      problema: {
        type: Sequelize.STRING
      },
      comoComprContratou: {
        type: Sequelize.STRING
      },
      procurouEmpresa: {
        type: Sequelize.STRING
      },
      respondida: {
        type: Sequelize.STRING
      },
      situacao: {
        type: Sequelize.STRING
      },
      avaliacao: {
        type: Sequelize.STRING
      },
      notaConsumidor: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Reclamacoes');
  }
};