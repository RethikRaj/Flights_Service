'use strict';
const {
  Model
} = require('sequelize');

const { ENUMS } = require('../utils/common');
const { ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST_CLASS } = ENUMS.SEAT_TYPES;

module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Airplane, {
        as : 'seatAirplaneDetails',
        foreignKey : 'airplaneId',
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
      })
    }
  }
  Seat.init({
    row: {
      type: DataTypes.INTEGER,
      allowNull : false
    },
    col: {
      type: DataTypes.STRING,
      allowNull : false
    },
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull : false
    },
    seatType: {
      type: DataTypes.ENUM,
      values : [ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST_CLASS],
      defaultValue : ECONOMY,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};