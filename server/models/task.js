'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.User, { as: 'user', foreignKey: 'id', sourceKey: 'assigned_to' });
      this.hasOne(models.Status, { as: 'task_status', foreignKey: 'id', sourceKey: 'status' });
      this.hasOne(models.Type, { as: 'task_type', foreignKey: 'id', sourceKey: 'type' });
      this.hasOne(models.Project, { as: 'project', foreignKey: 'id', sourceKey: 'belongs_to' });
    }
  }
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    assigned_to: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    sub_task: DataTypes.BOOLEAN,
    belongs_to: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};