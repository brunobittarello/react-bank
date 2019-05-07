'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Bruno Bittarello',
      login: 'bittarello',
      password: 'teste',
      email: 'brunobittarello@gmail.com',
      balance: 9999,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
