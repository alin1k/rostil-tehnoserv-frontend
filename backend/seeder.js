const { Sequelize, DataTypes } = require('sequelize');
const productData = require('../src/data/products.json');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
});

const Product = require('./models/Product')(sequelize);

const importData = async () => {
  try {
    await sequelize.sync({ force: true }); // This will drop existing tables and recreate them
    await Product.bulkCreate(productData);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await sequelize.sync({ force: true }); // This will drop existing tables
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
