'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('auth', [
      {
        user_id: 1,
        username: 'johndoe',
        password: await bcrypt.hash('12345', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 2,
        username: 'janesmith',
        password: await bcrypt.hash('12345', 10),
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('auth', null, {});
  }
};
