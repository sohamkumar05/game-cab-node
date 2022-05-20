const models = require("../models");

const stats = {
    getBalance: async function (req, res) {
        try {
            let balance = await models.variables.getVariableValue(models.variables.variableHolder.total_balance);
            res.status(200).send({ success: true, balance });
        } catch (error) {
            res.status(400).send({ success: false, error });
        }
    },
};

module.exports = stats;