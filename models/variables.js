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
  }
  variables.init({
    variable_name: DataTypes.STRING,
    variable_value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'variables',
  });

  variables.variableHolder = {
    total_balance: "total_balance",
    order_probability: "order_probability",
    special_order_probability: "special_order_probability",
    total_expense: "total_expense",
    total_revenue: "total_revenue",
    base_earning: "base_earning"
  };

  variables.getVariableValue = async (variable_name) => {
    try {
      let values = await variables.findOne({
        attributes: ["variable_value"],
        where:{variable_name}
      });
      if (values) {
        return values.variable_value;
      }
      throw "Invalid variable name";
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  variables.setVariableValue = async (variable_name, new_variable_value, t) => {
    try {
      const result = await variables.update(
        {variable_value: new_variable_value},
        {where: {variable_name}},
        { transaction: t }
      );
      return;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  return variables;
};