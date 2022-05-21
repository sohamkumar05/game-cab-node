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
    trip_load: DataTypes.INTEGER,
    is_accepted: DataTypes.BOOLEAN,
    is_delivered: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'trips',
  });

  trips.addTrip = async (tripData) => {
    try {
      await trips.create({
        vehicle_id: 0,
        source_id: tripData.source_id,
        destination_id: tripData.destination_id,
        trip_duration: 0,
        trip_earning: 0,
        trip_distance: tripData.trip_distance,
        trip_commission: 0,
        trip_load: tripData.trip_load,
        is_accepted: false,
        is_delivered: false
      });
      return;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  trips.getLatestTripAdded = async (whereConditions) => {
    try {
      let latestTrip = await trips.findOne({
        order: [
          ['createdAt', 'DESC']
        ],
        where: whereConditions
      });
      if (!latestTrip) {
        throw 'No trips found';
      }
      return latestTrip;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  trips.markTripAsAccepted = async (tripData, t) => {
    try {
      let { trip_id, vehicle_id, trip_earning, trip_commission, trip_duration } = tripData;
      await trips.update(
        {
          is_accepted: true,
          trip_commission,
          trip_earning,
          vehicle_id,
          trip_duration
        },
        { where: { id: trip_id } },
        { transaction: t }
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  trips.markTripAsDelivered = async (id, t) => {
    try {
      await trips.update(
        { is_delivered: true },
        { where: { id } },
        { transaction: t }
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  return trips;
};