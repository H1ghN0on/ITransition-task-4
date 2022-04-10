'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.changeColumn('Users', 'loginDate', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ""
    }, {
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
