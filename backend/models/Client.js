const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Client = sequelize.define('Client', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cNume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cTelefon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Client;
};
