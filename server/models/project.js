'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.User, { as: 'user', foreignKey: 'id', sourceKey: 'project_manager' });
      this.hasMany(models.Task, { as: 'task', foreignKey: 'belongs_to', sourceKey: 'id' });
    }
  }
  Project.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    project_manager: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};