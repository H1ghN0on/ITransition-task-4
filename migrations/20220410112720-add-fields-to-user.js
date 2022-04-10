'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Users', 'status', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })
    queryInterface.addColumn('Users', 'loginDate', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
