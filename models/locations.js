'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class locations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  locations.init({
    location_name: DataTypes.STRING,
    x_coordinate: DataTypes.INTEGER,
    y_coordinate: DataTypes.INTEGER,
    location_cost: DataTypes.INTEGER,
    is_unlocked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'locations',
  });

  locations.lockStatus = {
    LOCKED: false,
    UNLOCKED: true
  }

  locations.getAllLocations = () => {
    try {
      let locationDetails = await locations.findAll({
        attributes: ["id", "location_name", "location_cost", "is_unlocked"]
      });
      return locationDetails;
    } catch (error) {
      throw error;
    }
  }

  locations.getLocation = (id) => {
    try {
      let locationDetails = await locations.findAll({
        attributes: ["id", "location_name", "location_cost", "is_unlocked"],
        where: { id }
      });
      return locationDetails;
    } catch (error) {
      throw error;
    }
  }

  locations.unlockLocation = (id, t) => {
    try {
      await locations.update(
        { is_unlocked: locations.lockStatus.UNLOCKED },
        { where: { id } },
        {transaction: t}
      );
    } catch (error) {
      throw error;
    }
  }

  return locations;
};