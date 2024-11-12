'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.Room, { foreignKey: 'roomId' })
      Message.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Message.init({
    roomId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    message_text: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};