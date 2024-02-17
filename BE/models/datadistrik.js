'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DataDistrik extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DataDistrik.init({
    nama_kabupaten: DataTypes.STRING,
    nama_distrik: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DataDistrik',
  });
  return DataDistrik;
};