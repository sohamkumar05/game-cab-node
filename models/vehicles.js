'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehicles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  vehicles.init({
    vehicle_type: DataTypes.INTEGER,
    vehicle_cost: DataTypes.DECIMAL,
    max_distance: DataTypes.DECIMAL,
    driver_commission_percentage: DataTypes.DECIMAL,
    vehicle_capacity: DataTypes.INTEGER,
    avg_speed: DataTypes.DECIMAL,
    resell_value: DataTypes.DECIMAL,
    is_unlocked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'vehicles',
  });
  return vehicles;
};