'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReclamacoesPorAssunto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Legislacao, {
        through: 'ReclamacaoPorAssuntoLegislacao',
        foreignKey: 'reclamacaoPorAssuntoId'
      });
    }
  }
  ReclamacoesPorAssunto.init({
    assunto: DataTypes.STRING,
    qtd: DataTypes.INTEGER,
    concluido: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'ReclamacoesPorAssunto',
  });
  return ReclamacoesPorAssunto;
};