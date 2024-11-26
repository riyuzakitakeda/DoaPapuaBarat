'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('DataKelembagaans', 'cor_lat', Sequelize.STRING);
    await queryInterface.addColumn('DataKelembagaans', 'cor_long', Sequelize.STRING);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('DataKelembagaans', 'cor_lat');
    await queryInterface.removeColumn('DataKelembagaans', 'cor_long');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
