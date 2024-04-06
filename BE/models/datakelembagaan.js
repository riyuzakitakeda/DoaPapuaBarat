'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DataKelembagaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DataKelembagaan.init({
    nama_kabupaten: DataTypes.STRING,
    nama_kegiatan: DataTypes.STRING,
    distrik: DataTypes.STRING,
    desa: DataTypes.STRING,
    nama_tempat_ibadah: DataTypes.STRING,
    nama_ketua: DataTypes.STRING,
    jumlah_jiwa: DataTypes.INTEGER,
    jumlah_kk: DataTypes.INTEGER,
    jumlah_laki: DataTypes.INTEGER,
    jumlah_perempuan: DataTypes.INTEGER,
    jumlah_pns: DataTypes.INTEGER,
    jumlah_petani_nelayan: DataTypes.INTEGER,
    jumlah_swasta: DataTypes.INTEGER,
    alamat: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'datakelembagaan',
  });
  return DataKelembagaan;
};