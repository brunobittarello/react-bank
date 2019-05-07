'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Contacts', [{
      user: 1,
      name: 'Leonardo Silva',
      bank: 1,
      agency: 6548,
      account: 4515,
      email: 'leosilva@gmail.com',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      user: 1,
      name: 'Matheus Ritter',
      bank: 2,
      agency: 5156,
      account: 8515,
      email: 'matheus@heroes.com',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Contacts', null, {});
  }
};
