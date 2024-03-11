'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permission', [{
      id: 1,
      name: "view_product"
      // createdAt: new Date(),
      // updatedAt: new Date(),
    }, 
    {
      id: 2,
      name: "create_product"
    },
    {
      id: 3,
      name: "update_product"
    },
    {
      id: 4,
      name: "delete_product"
    },
    {
      id: 5,
      name: "view_container"
    },
    {
      id: 6,
      name: "create_container"
    },
    {
      id: 7,
      name: "update_container"
    },
    {
      id: 8,
      name: "delete_container"
    },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permission', null, {});
  }
};