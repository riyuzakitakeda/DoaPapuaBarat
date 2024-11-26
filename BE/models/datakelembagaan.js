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
    jumlah_jiwa: DataTypes.STRING,
    jumlah_kk: DataTypes.STRING,
    jumlah_laki: DataTypes.STRING,
    jumlah_perempuan: DataTypes.STRING,
    jumlah_pns: DataTypes.STRING,
    jumlah_petani_nelayan: DataTypes.STRING,
    jumlah_swasta: DataTypes.STRING,
    alamat: DataTypes.STRING,
    foto: DataTypes.STRING,
    cor_lat: DataTypes.STRING,
    cor_long: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'datakelembagaan',
  });
  return DataKelembagaan;
};