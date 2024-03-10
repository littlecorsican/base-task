'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Project, { as: 'project_manager', foreignKey: 'project_manager', sourceKey: 'id' });
      // this.hasOne(models.User, { as: 'user', foreignKey: 'assigned_to', sourceKey: 'id' });
      this.hasOne(models.Rank, { as: 'user_rank', foreignKey: 'id', sourceKey: 'rank' });

    }
  }
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    rank: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};