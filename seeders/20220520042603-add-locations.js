'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('locations',
      [{
        location_name: "India",
        x_coordinate: 0,
        y_coordinate: 0,
        location_cost: 0,
        is_unlocked: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location_name: "Pakistan",
        x_coordinate: 1,
        y_coordinate: 1,
        location_cost: 1,
        is_unlocked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location_name: 'Iran',
        x_coordinate: 2,
        y_coordinate: -2,
        location_cost: 5,
        is_unlocked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location_name: "China",
        x_coordinate: -2,
        y_coordinate: 2,
        location_cost: 8,
        is_unlocked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location_name: "Mongolia",
        x_coordinate: 4,
        y_coordinate: 3,
        location_cost: 10,
        is_unlocked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location_name: "Maldives",
        x_coordinate: 3,
        y_coordinate: 4,
        location_cost: 50,
        is_unlocked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location_name: "Thailand",
        x_coordinate: 8,
        y_coordinate: 8,
        location_cost: 80,
        is_unlocked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location_name: "Russia",
        x_coordinate: -8,
        y_coordinate: 8,
        location_cost: 100,
        is_unlocked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location_name: "USA",
        x_coordinate: 15,
        y_coordinate: 18,
        location_cost: 150,
        is_unlocked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location_name: "Japan",
        x_coordinate: 15,
        y_coordinate: -18,
        location_cost: 200,
        is_unlocked: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('locations', null, {});
  }
};
