'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane, {
        as : 'airplaneDetails',
        foreignKey : 'airplaneId',
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
      });

      this.belongsTo(models.Airport, {
        as : 'departureAirport',
        foreignKey : 'departureAirportCode',
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
      });

      this.belongsTo(models.Airport, {
        as : 'arrivalAirport',
        foreignKey : 'arrivalAirportCode',
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
      });
    }
  }
  Flight.init({
    flightNumber :{
      type : DataTypes.STRING, 
      allowNull : false
    },
    departureAirportCode : {
      type : DataTypes.STRING,
      allowNull : false
    },
    arrivalAirportCode : {
      type : DataTypes.STRING,
      allowNull : false
    },
    departureTime : {
      type : DataTypes.DATE,
      allowNull : false
    },
    arrivalTime : {
      type : DataTypes.DATE,
      allowNull : false
    },
    airplaneId : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    boardingGate : {
      type : DataTypes.STRING
    },
    remainingSeats : {
      type : DataTypes.INTEGER,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};