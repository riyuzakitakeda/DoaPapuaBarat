'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DataDesa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DataDesa.init({
    nama_kabupaten: DataTypes.STRING,
    nama_distrik: DataTypes.STRING,
    nama_desa: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DataDesa',
  });
  return DataDesa;
};