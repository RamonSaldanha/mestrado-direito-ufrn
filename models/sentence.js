'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sentence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sentence.init({
    numeroProcesso: DataTypes.STRING,
    julgador: DataTypes.STRING,
    teor: DataTypes.TEXT,
    resultado: DataTypes.STRING,
    relatorio: DataTypes.TEXT,
    fundamentos: DataTypes.TEXT,
    dispositivo: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Sentence',
  });
  return Sentence;
};