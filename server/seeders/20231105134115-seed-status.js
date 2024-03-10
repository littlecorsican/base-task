'use strict';

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
     await queryInterface.bulkInsert('statuses', [{
        id: "1",
        title: 'New',
      },
      {
        id: "2",
        title: 'Pending',
      },
      {
        id: "3",
        title: 'In Progress',
      },
      {
        id: "4",
        title: 'Done',
      },
      {
        id: "5",
        title: 'Validation',
      },
      {
        id: "6",
        title: 'Verified',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('statuses', null, {});
  }
};
