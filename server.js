require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./app/routes/authRoutes');
const uploadRoutes = require('./app/routes/uploadRoutes');
const productRoutes = require('./app/routes/productRoutes');
const userRoutes = require('./app/routes/userRoutes')
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/upload', uploadRoutes);
app.use('/products', productRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
