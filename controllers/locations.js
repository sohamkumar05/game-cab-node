const models = require("../models");

const locations = {
    getAllLocations: async function (req, res) {
        try {
            let locationsDetails = await models.locations.getAllLocations([]);
            let balance = parseFloat(await models.variables.getVariableValue(models.variables.variableHolder.total_balance));
            for (const location of locationsDetails) {
                location.can_be_unlocked = parseFloat(location.location_cost) <= balance;
            }
            res.status(200).send({ success: true, ...locationsDetails });
        } catch (error) {
            res.status(500).send({success: false, error});
        }
    },

    getLocation: async function (req, res) {
        try {
            let locationDetails = await models.locations.getLocation(req.params.location_id);
            let balance = parseFloat(await models.variables.getVariableValue(models.variables.variableHolder.total_balance));
            locationDetails.can_be_unlocked = (parseFloat(locationDetails.location_cost) <= balance) && !locationDetails.dataValues.is_unlocked;
            res.status(200).send({ success: true, ...(locationDetails.dataValues), can_be_unlocked: locationDetails.can_be_unlocked });
        } catch (error) {
            res.status(500).send({success: false, error});
        }
    },

    unlockLocation: async function (req, res) {
        const t = await models.sequelize.transaction();
        try {
            let locationDetails = await models.locations.getLocation(req.body.location_id);
            if (locationDetails.is_unlocked) {
                return res.status(400).send({
                    success: false,
                    error: "Location is already unlocked."
                });
            }
            let balance = parseFloat(await models.variables.getVariableValue(models.variables.variableHolder.total_balance));
            if (balance < parseFloat(locationDetails.location_cost)) {
                return res.status(400).send({
                    success: false,
                    error: "Not enough money to unlock."
                });
            }
            let total_expense = parseFloat(await models.variables.getVariableValue(models.variables.variableHolder.total_expense));
            balance = balance - parseFloat(locationDetails.location_cost);
            total_expense = total_expense + parseFloat(locationDetails.location_cost);
            await models.locations.unlockLocation(req.body.location_id, t);
            await models.variables.setVariableValue(models.variables.variableHolder.total_balance, balance, t);
            await models.variables.setVariableValue(models.variables.variableHolder.total_expense, total_expense, t);
            await t.commit();
            res.status(200).send({
                success: true,
                message: "Location unlock successful."
            });
        } catch (error) {
            await t.rollback();
            res.status(500).send({success: false, error});
        }
    }
}

module.exports = locations;