const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(morgan('tiny'));

// Import routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

// Environment Variables
const api = process.env.API_URL;
const connectionString = process.env.CONNECTION_STRING;

// Use routes
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// Connect to MongoDB
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then(() => {
    console.log('Database Connection is ready...');
})
.catch((err) => {
    console.error('Database connection error:', err);
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
