const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Furnizor = sequelize.define('Furnizor', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fNume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fAdresa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Furnizor;
};
