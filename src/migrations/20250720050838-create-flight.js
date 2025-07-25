'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightNumber : {
        type : Sequelize.STRING,
        allowNull : false
      },
      departureAirportCode: {
        type: Sequelize.STRING,
        allowNull: false,
        references : {
          model : 'Airports',
          key : 'code'
        },
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
      },
      arrivalAirportCode: {
        type: Sequelize.STRING,
        allowNull: false,
        references : {
          model : 'Airports',
          key : 'code'
        },
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
      },
      departureTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      arrivalTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model : 'Airplanes',
          key : 'id'
        },
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      boardingGate: {
        type: Sequelize.STRING
      },
      remainingSeats : {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flights');
  }
};