'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vehicle_type: {
        type: Sequelize.INTEGER
      },
      vehicle_cost: {
        type: Sequelize.DECIMAL
      },
      max_distance: {
        type: Sequelize.DECIMAL
      },
      driver_commission_percentage: {
        type: Sequelize.DECIMAL
      },
      vehicle_capacity: {
        type: Sequelize.INTEGER
      },
      avg_speed: {
        type: Sequelize.DECIMAL
      },
      resell_value: {
        type: Sequelize.DECIMAL
      },
      is_unlocked: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('vehicles');
  }
};