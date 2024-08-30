'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const data = require("../data/data.json").map((el) =>{
    el.createdAt = new Date();
    el.updatedAt = new Date();
    return el
   });
   await queryInterface.bulkInsert("Movies", data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Movies", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
