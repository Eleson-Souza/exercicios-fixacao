const sequelize = require('sequelize');

var Connection = new sequelize('db_api', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = Connection;