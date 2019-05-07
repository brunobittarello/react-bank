'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    user: DataTypes.INTEGER,
    name: DataTypes.STRING,
    bank: DataTypes.INTEGER,
    agency: DataTypes.INTEGER,
    account: DataTypes.INTEGER,
    email: DataTypes.STRING
  }, {});
  Contact.associate = function(models) {
    // associations can be defined here
  };
  return Contact;
};