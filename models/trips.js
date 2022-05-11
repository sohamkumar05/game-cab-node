'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trips extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  trips.init({
    vehicle_id: DataTypes.INTEGER,
    source_id: DataTypes.INTEGER,
    destination_id: DataTypes.INTEGER,
    trip_duration: DataTypes.DECIMAL,
    trip_earning: DataTypes.DECIMAL,
    trip_distance: DataTypes.DECIMAL,
    trip_commission: DataTypes.DECIMAL,
    trip_load: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'trips',
  });
  return trips;
};