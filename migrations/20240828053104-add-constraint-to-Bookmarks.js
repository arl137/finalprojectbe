'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addConstraint('Bookmarks', {
      fields: ['movieId', 'userId'],
      type: 'unique',
      name: 'unique_bookmark'
    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeConstraint('Bookmarks', 'unique_bookmark');
  }
};
