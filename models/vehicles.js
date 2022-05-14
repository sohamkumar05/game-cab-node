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

  vehicles.getAllVehicles = async() => {
    try {
      let vehiclesData = await sequelize.query(`
      select total.vehicle_type,
      cast(unlock_cost as signed) as unlock_cost,
      total_number,
      unlocked_number from
        (select vehicle_type,
        vehicle_cost as unlock_cost,
        count(*) as total_number
        from vehicles
        group by vehicle_type) as total
        left join
        (select vehicle_type,
          count(*) as unlocked_number
          from vehicles
          where is_unlocked = 1
          group by vehicle_type) as unlocked
        on total.vehicle_type = unlocked.vehicle_type;
      `, { type: sequelize.QueryTypes.SELECT });
      return vehiclesData;
    } catch (error) {
      console.error(error);
      throw error;
    }

  }

  vehicles.getVehicles = async(vehicle_type) => {
    try {
      let vehiclesData = await sequelize.query(`
      select total.vehicle_type,
      cast(unlock_cost as signed) as vehicle_cost,
      total_number,
      unlocked_number,
      max_distance,
      driver_commission_percentage,
      vehicle_capacity from
        (select vehicle_type,
        vehicle_cost as unlock_cost,
        count(*) as total_number,
        max_distance,
        driver_commission_percentage,
        vehicle_capacity
        from vehicles
        where vehicle_type = ${vehicle_type}
        group by vehicle_type) as total
        left join
        (select vehicle_type,
          count(*) as unlocked_number
          from vehicles
          where is_unlocked = 1 and vehicle_type = ${vehicle_type}
          group by vehicle_type) as unlocked
        on total.vehicle_type = unlocked.vehicle_type;
      `, { type: sequelize.QueryTypes.SELECT });
      return vehiclesData[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  vehicles.getUnlockedVehiclesId = async(vehicle_type) => {
    try {
      let unlockedVehicle = await vehicles.findOne({
        attributes: ["id"],
        where: {
          vehicle_type,
          is_unlocked: false
        }
      });
      if (!unlockedVehicle) {
        throw "No locked vehicle available for this type.";
      }
      return unlockedVehicle.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  vehicles.unlockVehicleById = async(id) => {
    try {
      const result = await vehicles.update(
        {is_unlocked: true},
        {where: {id}}
      );
      return;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return vehicles;
};