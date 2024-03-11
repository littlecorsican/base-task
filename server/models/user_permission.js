'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { as: 'user', foreignKey: 'user_id', sourceKey: 'id' });
      this.belongsTo(models.permission, { as: 'permission', foreignKey: 'permission_id', sourceKey: 'id' });
    }
  }
  User_Permission.init({
    user_id: DataTypes.INTEGER,
    permission_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_Permission',
  });
  return User_Permission;
};