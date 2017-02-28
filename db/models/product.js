'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const Product = db.define('products', {
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  description: Sequelize.TEXT,
  imageURL: {
    type: Sequelize.STRING
    // defaultValue: // TODO: product image placeholder
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      isDecimal: true,
      min: 0
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  product_type: Sequelize.ENUM('album', 'clothing'),
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Product
