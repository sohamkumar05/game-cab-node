'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class variables extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static variableHolder = {
      total_balance: "total_balance",
      order_probability: "order_probability",
      special_order_probability: "special_order_probability",
      total_expense: "total_expense",
      total_revenue: "total_revenue"
    }
  }
  variables.init({
    variable_name: DataTypes.STRING,
    variable_value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'variables',
  });
  return variables;
};