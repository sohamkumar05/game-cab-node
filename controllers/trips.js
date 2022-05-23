const models = require("../models");

const trips = {
    getTrip: async function (req, res) {
        try {
            let probability = parseFloat(await models.variables.getVariableValue(models.variables.variableHolder.order_probability));
            if (Math.random() > probability) {
                return res.status(400).send({ success: false, error: "No order." });
            }
            let locationDetails = await models.locations.getAllLocations(["x_coordinate", "y_coordinate"]);
            locationDetails = locationDetails.filter(location => location.is_unlocked == true);
            let sourceLocation, destinationLocation;
            if (locationDetails.length <= 1) {
                return res.status(400).send({ success: false, error: "No locations available." });
            } else {
                locationDetails.sort(() => Math.random() - Math.random()).slice(0, 2);
                sourceLocation = locationDetails[0];
                destinationLocation = locationDetails[1];
            }
            let trip_distance = Math.sqrt(
                Math.pow(sourceLocation.x_coordinate - destinationLocation.x_coordinate, 2)
                + Math.pow(sourceLocation.y_coordinate - destinationLocation.y_coordinate, 2)
            ).toFixed(2);
            if (trip_distance > 20) {
                return res.status(400).send({ success: false, error: "Distance too high." });
            }
            let numberOfPeople = Math.ceil(Math.random() * 10);
            let eligibleVehicles = await models.vehicles.getFreeVehiclesBasedOnDistanceAndLoad(trip_distance, numberOfPeople);
            if (!eligibleVehicles.length) {
                return res.status(400).send({ success: false, error: "No vehicles available." });
            }
            let tripData = {
                source_id: sourceLocation.id,
                source_name: sourceLocation.location_name,
                destination_id: destinationLocation.id,
                destination_name: destinationLocation.location_name,
                trip_distance,
                trip_load: numberOfPeople,
                vehicles: []
            }
            let specialProbability = parseFloat(await models.variables.getVariableValue(models.variables.variableHolder.special_order_probability));
            let base_earning = parseFloat(await models.variables.getVariableValue(models.variables.variableHolder.base_earning));
            let isDoubled = Math.random() < specialProbability;
            for (let i = 0; i < eligibleVehicles.length; i++) {
                let trip_earning = (isDoubled ? 2 : 1) * base_earning * trip_distance * numberOfPeople * eligibleVehicles[i].vehicle_type;
                let duration = trip_distance / eligibleVehicles[i].avg_speed;
                let minutes = Math.floor(duration);
                let seconds = Math.round((duration - minutes) * 60);
                tripData.vehicles.push({
                    vehicle_type: eligibleVehicles[i].vehicle_type,
                    trip_earning: trip_earning.toFixed(2),
                    driver_commission: (trip_earning * parseFloat(eligibleVehicles[i].driver_commission_percentage) / 100).toFixed(2),
                    trip_duration: { minutes, seconds }
                });
            }
            await models.trips.addTrip(tripData);
            let tripDataToFetchId = await models.trips.getLatestTripAdded({
                source_id: sourceLocation.id,
                destination_id: destinationLocation.id,
                trip_load: numberOfPeople
            });
            tripData.trip_id = tripDataToFetchId.id;
            tripData.is_doubled = isDoubled;
            res.status(200).send({ success: true, tripData });
        } catch (error) {
            res.status(400).send({ success: false, error });
        }
    },
    acceptTrip: async function (req, res) {
        const t = await models.sequelize.transaction();
        try {
            let {vehicle_type, trip_id, is_doubled} = req.body;
            let tripDataForTripId = await models.trips.getLatestTripAdded({id: trip_id});
            let freeVehicleOfType = await models.vehicles.getFreeVehicleOfType(vehicle_type);
            let base_earning = parseFloat(await models.variables.getVariableValue(models.variables.variableHolder.base_earning));
            let trip_earning = (is_doubled ? 2 : 1) * base_earning * tripDataForTripId.trip_distance * tripDataForTripId.trip_load * vehicle_type;
            let duration = tripDataForTripId.trip_distance / freeVehicleOfType.avg_speed;
            let minutes = Math.floor(duration);
            let seconds = Math.round((duration - minutes) * 60);
            let driver_commission = (trip_earning * parseFloat(freeVehicleOfType.driver_commission_percentage) / 100).toFixed(2);
            let tripDataToAccept = {
                trip_id,
                vehicle_id: freeVehicleOfType.vehicle_id,
                trip_earning,
                trip_commission: driver_commission,
                trip_duration: minutes * 60 + seconds
            };
            await models.trips.markTripAsAccepted(tripDataToAccept, t);
            await t.commit();
            res.status(200).send({ success: true, message: "Trip accepted." });
        } catch (error) {
            await t.rollback();
            res.status(400).send({ success: false, error });
        }
    },
    completeTrip: async function (req, res) {
        const t = await models.sequelize.transaction();
        try {
            let {trip_id} = req.body;
            let tripDataForTripId = await models.trips.getLatestTripAdded({id: trip_id});
            let balance = parseFloat(await models.variables.getVariableValue(models.variables.variableHolder.total_balance));
            let total_expense = parseFloat(await models.variables.getVariableValue(models.variables.variableHolder.total_expense));
            let total_revenue = parseFloat(await models.variables.getVariableValue(models.variables.variableHolder.total_revenue));
            total_revenue = total_revenue + parseFloat(tripDataForTripId.trip_earning);
            balance = balance + parseFloat(tripDataForTripId.trip_earning) - parseFloat(tripDataForTripId.trip_commission);
            total_expense = total_expense + parseFloat(tripDataForTripId.trip_commission);
            await models.trips.markTripAsDelivered(trip_id, t);
            await models.variables.setVariableValue(models.variables.variableHolder.total_balance, balance, t);
            await models.variables.setVariableValue(models.variables.variableHolder.total_expense, total_expense, t);
            await models.variables.setVariableValue(models.variables.variableHolder.total_revenue, total_revenue, t);
            await t.commit();
            res.status(200).send({ success: true, message: "Trip completed." });
        } catch (error) {
            await t.rollback();
            res.status(400).send({ success: false, error });
        }
    }
}

module.exports = trips;