'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.User, { as: 'rank', foreignKey: 'rank', sourceKey: 'id' });
    }
  }
  Rank.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rank',
  });
  return Rank;
};