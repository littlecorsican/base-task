'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permission', [{
      id: 1,
      name: "view_product"
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
      name: "view_permission"
    },
    {
      id: 6,
      name: "alter_permission"
    },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permission', null, {});
  }
};