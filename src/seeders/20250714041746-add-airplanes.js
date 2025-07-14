'use strict';
const {Op} = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Airplanes', [
      {modelName: 'Boeing 747', capacity : 500, createdAt : new Date(), updatedAt : new Date()}, 
      {modelName: 'Airbus A380', capacity : 600, createdAt : new Date(), updatedAt : new Date()}
    ]);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Airplanes', {
      [Op.or] : [{modelName : 'Boeing 747'}, {modelName : 'Airbus A380'}]
    });
  }
};
