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
  return variables;
};