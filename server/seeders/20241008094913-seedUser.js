'use strict';
const {hashPassword} = require('../helpers/bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const user = require('../data/user.json')
    user.forEach((e) => {
      e.password = hashPassword(e.password)
      e.updatedAt = new Date()
      e.createdAt = new Date()
      
    })
    await queryInterface.bulkInsert('Users', user, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {truncate: true, cascade: true, restartIdentity: true});
  }
};
