
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Sequelize (SQLite)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // This will create a SQLite file named database.sqlite
});

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('SQLite connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Import Models
const Product = require('./models/Product')(sequelize);
const Client = require('./models/Client')(sequelize);
const Furnizor = require('./models/Furnizor')(sequelize);
const Oferta = require('./models/Oferta')(sequelize);

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const productsRouter = require('./routes/products')(Product);
const clientsRouter = require('./routes/clients')(Client);
const furnizoriRouter = require('./routes/furnizori')(Furnizor);
const oferteRouter = require('./routes/oferte')(Oferta);

// Use Routes
app.use('/products', productsRouter);
app.use('/clients', clientsRouter);
app.use('/furnizori', furnizoriRouter);
app.use('/oferte', oferteRouter);

// Sync models with database
sequelize.sync().then(() => {
  console.log('Database and tables created!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
