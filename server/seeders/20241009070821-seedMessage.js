'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const messages = require('../data/message.json')
    messages.forEach((e) => {
      e.updatedAt = new Date()
      e.createdAt = new Date()
      
    })
    await queryInterface.bulkInsert('Messages', messages, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Messages', null, {truncate: true, cascade: true, restartIdentity: true});
  }
};
