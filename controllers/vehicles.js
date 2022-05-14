const models = require("../models");

const vehicles = {

    getAllVehicles: async function (req, res) {
        try {
            let vehicles = await models.vehicles.getAllVehicles();
            for (const vehicle of vehicles) {
                vehicle.are_all_unlocked = vehicle.total_number === vehicle.unlocked_number;
                if (vehicle.unlocked_number === null) {
                    vehicle.unlocked_number = 0;
                }
            }
            res.status(200).send(vehicles);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    getVehicles: async function (req, res) {
        try {
            let vehicle = await models.vehicles.getVehicles(req.params.vehicle_type);
            vehicle.are_all_unlocked = vehicle.total_number === vehicle.unlocked_number;
            if (vehicle.unlocked_number === null) {
                vehicle.unlocked_number = 0;
            }
            res.status(200).send(vehicle);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    unlockVehicle: async function (req, res) {
        try {
            let vehicle = await models.vehicles.getVehicles(req.params.vehicle_type);
            if (vehicle.total_number === vehicle.unlocked_number) {
                res.status(400).send({
                    success: false,
                    message: "All vehicles already unlocked."
                });
            }
            let id = await models.vehicles.getUnlockedVehiclesId(req.params.vehicle_type);
            await models.vehicles.unlockVehicleById(id);
            res.status(200).send({
                success: true,
                message: "Vehicle unlock successful."
            });
        } catch (error) {
            res.status(400).send({
                success: false,
                message: "Vehicle unlock unsuccessful."
            });
        }
    }

}

module.exports = vehicles;