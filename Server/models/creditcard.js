'use strict';
module.exports = (sequelize, DataTypes) => {
  const CreditCard = sequelize.define('CreditCard', {
    userId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    cardNumber: DataTypes.STRING,
    expMonth: DataTypes.INTEGER,
    expYear: DataTypes.INTEGER,
    securityCode: DataTypes.INTEGER
  }, {});
  CreditCard.associate = function(models) {
    // associations can be defined here
  };
  return CreditCard;
};