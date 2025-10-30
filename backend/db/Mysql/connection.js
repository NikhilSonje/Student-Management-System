const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_DATABASE,     // database name
    process.env.DB_USER,     // username
    process.env.DB_PASSWORD,     // password
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false,
        pool: { max: 10, min: 0, idle: 10000 }
    }
);

module.exports = sequelize;