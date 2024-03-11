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
      this.belongsTo(models.User, { as: 'user', foreignKey: 'id', sourceKey: 'user_id' });
      this.belongsTo(models.Permission, { as: 'permission', foreignKey: 'id', sourceKey: 'permission_id' });
    }
  }
  User_Permission.init({
    user_id: DataTypes.INTEGER,
    permission_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_Permission',
    freezeTableName: true,
    timestamps: false,
  });
  return User_Permission;
};