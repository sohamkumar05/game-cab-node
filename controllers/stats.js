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

    getStats: async function (req, res) {
        try {
            let {number_of_completed_orders, total_trip_time} = await models.trips.getTotalOrdersCompletedAndTotalTripTime();
            let total_revenue = await models.variables.getVariableValue(models.variables.variableHolder.total_revenue);
            let total_expense = await models.variables.getVariableValue(models.variables.variableHolder.total_expense);
            let statsData = {
                number_of_completed_orders,
                total_trip_time: {
                    minutes: Math.floor(total_trip_time / 60),
                    seconds: Math.floor(total_trip_time % 60)
                },
                total_revenue,
                total_expense,
                revenue_rate: total_revenue * 60 / total_trip_time,
                total_profit: total_revenue - total_expense
            };
            let driver_wise_stats = await models.trips.getStatsForEveryVehicleType();
            for (let entry of driver_wise_stats) {
                entry.total_profit = parseFloat(entry.total_revenue) - parseFloat(entry.total_expense);
            }
            statsData.driver_wise_stats = driver_wise_stats;
            res.status(200).send({ success: true, statsData });
        } catch (error) {
            res.status(400).send({ success: false, error });
        }
    }
};

module.exports = stats;