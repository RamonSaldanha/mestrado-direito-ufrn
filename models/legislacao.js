'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Legislacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.ReclamacoesPorAssunto, {
        through: 'ReclamacaoPorAssuntoLegislacao',
        foreignKey: 'legislacaoId'
      });
    }
  }
  Legislacao.init({
    artigo: DataTypes.TEXT('long'),
    lei: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Legislacao',
  });
  return Legislacao;
};