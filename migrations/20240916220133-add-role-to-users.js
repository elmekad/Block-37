'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('FullstackAdmin', 10);
    await queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      email: 'adkeydevelopment@gmail.com',
      password: hashedPassword,
      roles: JSON.stringify(['admin']), // Adding 'admin' role
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { email: 'adkeydevelopment@gmail.com' }, {});
  }
};
