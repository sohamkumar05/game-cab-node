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
    vehicle_cost: DataTypes.DECIMAL(10, 2),
    max_distance: DataTypes.DECIMAL(10, 2),
    driver_commission_percentage: DataTypes.DECIMAL(10, 2),
    vehicle_capacity: DataTypes.INTEGER,
    avg_speed: DataTypes.DECIMAL(10, 2),
    resell_value: DataTypes.DECIMAL(10, 2),
    is_unlocked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'vehicles',
  });

  vehicles.lockStatus = {
    LOCKED: false,
    UNLOCKED: true
  }

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

  vehicles.getResellValue = async (vehicle_type) => {
    try {
      let values = await vehicles.findOne({
        attributes: ["resell_value"],
        where:{vehicle_type}
      });
      if (values) {
        return values.resell_value;
      }
      throw "Invalid variable name";
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  vehicles.getVehiclesIdOnLockStatus = async(vehicle_type, is_unlocked) => {
    try {
      let unlockedVehicle = await vehicles.findOne({
        attributes: ["id"],
        where: {
          vehicle_type,
          is_unlocked
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

  vehicles.unlockOrLockVehicleByIdOnLockStatus = async(id, is_unlocked, t) => {
    try {
      const result = await vehicles.update(
        {is_unlocked},
        {where: {id}},
        { transaction: t }
      );
      return;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return vehicles;
};