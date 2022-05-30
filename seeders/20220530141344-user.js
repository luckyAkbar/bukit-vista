"use strict";

const { encrypt } = require("../helpers/crypto");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const date = new Date();

    queryInterface.bulkInsert("users", [
      {
        name: "Jhon Doe",
        password: encrypt("123456"),
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
