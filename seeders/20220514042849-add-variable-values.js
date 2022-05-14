'use strict';

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
    await queryInterface.bulkInsert('variables', 
    [{
      variable_name: 'total_balance',
      variable_value: '10',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      variable_name: 'order_probability',
      variable_value: '0.2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      variable_name: 'special_order_probability',
      variable_value: '0.15',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      variable_name: 'total_expense',
      variable_value: '0',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      variable_name: 'total_revenue',
      variable_value: '0',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      variable_name: 'base_earning',
      variable_value: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('variables', null, {});
  }
};
