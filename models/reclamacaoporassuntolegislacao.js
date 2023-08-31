'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReclamacaoPorAssuntoLegislacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsTo(models.ReclamacoesPorAssunto, { foreignKey: 'id' });
      // this.belongsTo(models.ReclamacoesPorAssunto)

      // // // Associação com o modelo Legislacao
      // this.belongsToMany(models.Legislacao, {
      //   through: 'ReclamacaoPorAssuntoLegislacao',
      //   foreignKey: 'id'
      // });
    }
  }
  ReclamacaoPorAssuntoLegislacao.init({
    reclamacaoPorAssuntoId: DataTypes.INTEGER,
    legislacaoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ReclamacaoPorAssuntoLegislacao',
  });
  return ReclamacaoPorAssuntoLegislacao;
};