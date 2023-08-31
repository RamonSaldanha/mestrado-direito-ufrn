'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reclamacoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reclamacoes.init({
    regiao: DataTypes.STRING,
    UF: DataTypes.STRING,
    cidade: DataTypes.STRING,
    faixaEtaria: DataTypes.STRING,
    dataFinalizacao: DataTypes.DATE,
    tempoResposta: DataTypes.INTEGER,
    nomeFantasia: DataTypes.STRING,
    segmento: DataTypes.STRING,
    area: DataTypes.STRING,
    assunto: DataTypes.STRING,
    grupoProblema: DataTypes.STRING,
    problema: DataTypes.STRING,
    comoComprContratou: DataTypes.STRING,
    procurouEmpresa: DataTypes.STRING,
    respondida: DataTypes.STRING,
    situacao: DataTypes.STRING,
    avaliacao: DataTypes.STRING,
    notaConsumidor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reclamacoes',
  });
  return Reclamacoes;
};