'use strict';

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'roles', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'user', // Set a default role for existing users
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'roles');
  }
};
