'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DataKelembagaans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_kabupaten: {
        type: Sequelize.STRING
      },
      nama_kegiatan: {
        type: Sequelize.STRING
      },
      distrik: {
        type: Sequelize.STRING
      },
      desa: {
        type: Sequelize.STRING
      },
      nama_tempat_ibadah: {
        type: Sequelize.STRING
      },
      nama_ketua: {
        type: Sequelize.STRING
      },
      jumlah_jiwa: {
        type: Sequelize.INTEGER
      },
      jumlah_kk: {
        type: Sequelize.INTEGER
      },
      jumlah_laki: {
        type: Sequelize.INTEGER
      },
      jumlah_perempuan: {
        type: Sequelize.INTEGER
      },
      jumlah_pns: {
        type: Sequelize.INTEGER
      },
      jumlah_petani_nelayan: {
        type: Sequelize.INTEGER
      },
      jumlah_swasta: {
        type: Sequelize.INTEGER
      },
      alamat: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DataKelembagaans');
  }
};