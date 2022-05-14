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
        type: Sequelize.DECIMAL(10, 2)
      },
      max_distance: {
        type: Sequelize.DECIMAL(10, 2)
      },
      driver_commission_percentage: {
        type: Sequelize.DECIMAL(10, 2)
      },
      vehicle_capacity: {
        type: Sequelize.INTEGER(10, 2)
      },
      avg_speed: {
        type: Sequelize.DECIMAL(10, 2)
      },
      resell_value: {
        type: Sequelize.DECIMAL(10, 2)
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