'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transference = sequelize.define('Transference', {
    userId: DataTypes.INTEGER,
    contact: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    date: DataTypes.DATE
  }, {});
  Transference.associate = function(models) {
    // associations can be defined here
  };
  return Transference;
};