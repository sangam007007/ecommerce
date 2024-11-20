const sequelize = require('../../config/database');
const User = require('./User');
const Product = require('./Product');

sequelize.sync({ alter: true });

module.exports = { sequelize, User, Product };
