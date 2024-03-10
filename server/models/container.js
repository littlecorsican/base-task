'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Container extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasOne(models.Container, { as: 'container', foreignKey: 'container', sourceKey: 'container' });
    }
  }
  Container.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    container: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Container',
  });
  return Container;
};