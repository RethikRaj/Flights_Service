'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addConstraint('Airports',{
      fields : ['cityId'],
      type : 'foreign key',
      name : 'city foreign key constraint',
      references : {
        table : 'Cities',
        field : 'id'
      },
      onDelete : 'CASCADE',
      onUpdate : 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Airports', 'city foreign key constraint');
  }
};
