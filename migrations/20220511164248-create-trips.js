'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vehicle_id: {
        type: Sequelize.INTEGER
      },
      source_id: {
        type: Sequelize.INTEGER
      },
      destination_id: {
        type: Sequelize.INTEGER
      },
      trip_duration: {
        type: Sequelize.DECIMAL
      },
      trip_earning: {
        type: Sequelize.DECIMAL
      },
      trip_distance: {
        type: Sequelize.DECIMAL
      },
      trip_commission: {
        type: Sequelize.DECIMAL
      },
      trip_load: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('trips');
  }
};