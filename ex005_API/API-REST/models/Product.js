const sequelize = require('sequelize');
const connection = require('../database/connection');

var Product = connection.define('product', {
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    category: {
        type: sequelize.STRING,
        allowNull: true
    },
    amount: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: sequelize.DECIMAL,
        allowNull: false
    },
    totalPrice: {
        type: sequelize.DECIMAL,
        allowNull: false
    }
});

//Product.sync({force: false});

module.exports = Product;