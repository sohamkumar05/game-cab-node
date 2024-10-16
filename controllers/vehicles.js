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
            res.status(200).send({success: true, ...vehicles});
        } catch (error) {
            res.status(500).send({success: false, error});
        }
    },

    getVehicles: async function (req, res) {
        try {
            let vehicle = await models.vehicles.getVehicles(req.params.vehicle_type);
            vehicle.are_all_unlocked = vehicle.total_number === vehicle.unlocked_number;
            if (vehicle.unlocked_number === null) {
                vehicle.unlocked_number = 0;
            }
            res.status(200).send({success: true, ...vehicle});
        } catch (error) {
            res.status(500).send({success: false, error});
        }
    },

    unlockVehicle: async function (req, res) {
        const t = await models.sequelize.transaction();
        try {
            let vehicle = await models.vehicles.getVehicles(req.body.vehicle_type);
            if (vehicle.total_number === vehicle.unlocked_number) {
                return res.status(400).send({
                    success: false,
                    message: "All vehicles already unlocked."
                });
            }
            let id = await models.vehicles.getVehiclesIdOnLockStatus(req.body.vehicle_type, models.vehicles.lockStatus.LOCKED);
            let balance = parseFloat(await models.variables.getVariableValue(models.variables.variableHolder.total_balance));
            let total_expense = parseFloat(await models.variables.getVariableValue(models.variables.variableHolder.total_expense));
            if (balance < vehicle.vehicle_cost) {
                res.status(400).send({
                    success: false,
                    message: "Not enough money."
                });
            }
            balance = balance - vehicle.vehicle_cost;
            total_expense = total_expense + vehicle.vehicle_cost;
            await models.vehicles.unlockOrLockVehicleByIdOnLockStatus(id, models.vehicles.lockStatus.UNLOCKED, t);
            await models.variables.setVariableValue(models.variables.variableHolder.total_balance, balance, t);
            await models.variables.setVariableValue(models.variables.variableHolder.total_expense, total_expense, t);
            await t.commit();
            res.status(200).send({
                success: true,
                message: "Vehicle unlock successful."
            });
        } catch (error) {
            await t.rollback();
            res.status(500).send({
                success: false,
                message: "Vehicle unlock unsuccessful."
            });
        }
    },

    resellVehicle: async function (req, res) {
        const t = await models.sequelize.transaction();
        try {
            let vehicle = await models.vehicles.getVehicles(req.body.vehicle_type);
            if (!vehicle.unlocked_number) {
                return res.status(400).send({
                    success: false,
                    message: "All vehicles already locked."
                });
            }
            let resell_value = parseFloat(await models.vehicles.getResellValue(req.body.vehicle_type));
            let id = await models.vehicles.getVehiclesIdOnLockStatus(req.body.vehicle_type, models.vehicles.lockStatus.UNLOCKED);
            let balance = parseFloat(await models.variables.getVariableValue(models.variables.variableHolder.total_balance));
            balance = balance + resell_value;
            await models.vehicles.unlockOrLockVehicleByIdOnLockStatus(id, models.vehicles.lockStatus.LOCKED, t);
            await models.variables.setVariableValue(models.variables.variableHolder.total_balance, balance, t);
            await t.commit();
            res.status(200).send({
                success: true,
                message: "Vehicle lock successful."
            });
        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).send({
                success: false,
                message: "Vehicle lock unsuccessful."
            });
        }
    },

    getResellValue: async function (req, res) {
        try {
            let resell_value = await models.vehicles.getResellValue(req.params.vehicle_type);
            res.status(200).send({ success: true, resell_value });
        } catch (error) {
            res.status(500).send({success: false, error});
        }
    }

}

module.exports = vehicles;