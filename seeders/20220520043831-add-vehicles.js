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
   let vehiclesData = [];
   for (let index = 0; index < 10; index++) {
     vehiclesData.push({
      vehicle_type: 1,
      vehicle_cost: 1.0,
      max_distance: 1.0,
      driver_commission_percentage: 10.0,
      vehicle_capacity: 1.0,
      avg_speed: 2.0,
      resell_value: 0.85,
      is_unlocked: false,
      createdAt: new Date(),
      updatedAt: new Date()
     });
     vehiclesData.push({
      vehicle_type: 2,
      vehicle_cost: 2.0,
      max_distance: 3.0,
      driver_commission_percentage: 15.0,
      vehicle_capacity: 4.0,
      avg_speed: 3.0,
      resell_value: 1.65,
      is_unlocked: false,
      createdAt: new Date(),
      updatedAt: new Date()
     });
     vehiclesData.push({
      vehicle_type: 3,
      vehicle_cost: 5.0,
      max_distance: 5.0,
      driver_commission_percentage: 15.0,
      vehicle_capacity: 4.0,
      avg_speed: 5.0,
      resell_value: 4.2,
      is_unlocked: false,
      createdAt: new Date(),
      updatedAt: new Date()
     });
     vehiclesData.push({
      vehicle_type: 4,
      vehicle_cost: 10.0,
      max_distance: 10.0,
      driver_commission_percentage: 20.0,
      vehicle_capacity: 3.0,
      avg_speed: 8.0,
      resell_value: 6.8,
      is_unlocked: false,
      createdAt: new Date(),
      updatedAt: new Date()
     });
     vehiclesData.push({
      vehicle_type: 5,
      vehicle_cost: 20.0,
      max_distance: 15.0,
      driver_commission_percentage: 25.0,
      vehicle_capacity: 4.0,
      avg_speed: 10.0,
      resell_value: 11.6,
      is_unlocked: false,
      createdAt: new Date(),
      updatedAt: new Date()
     });
     vehiclesData.push({
      vehicle_type: 6,
      vehicle_cost: 50.0,
      max_distance: 15.0,
      driver_commission_percentage: 25.0,
      vehicle_capacity: 6.0,
      avg_speed: 10.0,
      resell_value: 29.4,
      is_unlocked: false,
      createdAt: new Date(),
      updatedAt: new Date()
     });
     vehiclesData.push({
      vehicle_type: 7,
      vehicle_cost: 100.0,
      max_distance: 20.0,
      driver_commission_percentage: 30.0,
      vehicle_capacity: 10.0,
      avg_speed: 10.0,
      resell_value: 56.2,
      is_unlocked: false,
      createdAt: new Date(),
      updatedAt: new Date()
     });
   }
   await queryInterface.bulkInsert('vehicles', vehiclesData, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('vehicles', null, {});
  }
};
