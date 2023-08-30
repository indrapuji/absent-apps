'use strict';
const {hashPassword} = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
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
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          nama: 'Indra Puji Novirwan',
          email: 'indrapuji@gmail.com',
          password: hashPassword('Jakarta2016'),
          role: 'super-admin',
          user_status: true,
          status_password: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: 'Meiske Olivia',
          email: 'meiske@gmail.com',
          password: hashPassword('Jakarta2016'),
          role: 'pengawas',
          user_status: true,
          status_password: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: 'Akbar Akma',
          email: 'akbar@gmail.com',
          password: hashPassword('Jakarta2016'),
          role: 'koordinator',
          pengawas_id: 2,
          user_status: true,
          status_password: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nama: 'Erich',
          email: 'erich@gmail.com',
          password: hashPassword('Jakarta2016'),
          role: 'leader',
          pengawas_id: 2,
          koordinator_id: 3,
          user_status: true,
          status_password: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // {
        //   nama: "Donny",
        //   email: "donny@gmail.com",
        //   password: hashPassword("Jakarta2016"),
        //   role: "cs",
        //   pengawas_id: 2,
        //   koordinator_id: 3,
        //   leader_id: 4,
        //   user_status: true,
        //   status_password: false,
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   nama: "Juno",
        //   email: "juno@gmail.com",
        //   password: hashPassword("Jakarta2016"),
        //   role: "security",
        //   pengawas_id: 2,
        //   koordinator_id: 3,
        //   leader_id: 4,
        //   user_status: true,
        //   status_password: false,
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  },
};
