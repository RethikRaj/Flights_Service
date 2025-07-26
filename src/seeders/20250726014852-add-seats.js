'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const seats = [];
    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const airplaneId = 1;
    const seatType = 'ECONOMY'; 

    for (let row = 1; row <= 3; row++) {
      for (const col of columns) {
        seats.push({
          row,
          col,
          airplaneId,
          seatType,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    await queryInterface.bulkInsert('Seats', seats);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Seats', null, {});
  }
};
