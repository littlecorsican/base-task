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
    await queryInterface.bulkInsert('user_permission', [{
      user_id: 1,
      permission_id: 1
    },
    {
      user_id: 1,
      permission_id: 2
    },
    {
      user_id: 1,
      permission_id: 3
    },
    {
      user_id: 1,
      permission_id: 4
    },
    {
      user_id: 1,
      permission_id: 5
    },
    {
      user_id: 1,
      permission_id: 6
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('user_permission', null, {});
  }
};
