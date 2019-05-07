'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    balance: DataTypes.FLOAT
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};