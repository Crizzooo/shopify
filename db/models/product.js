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
    type: Sequelize.STRING,
    //TODO: change default value later
    defaultValue: 'http://www.thebakerymadewithlove.com/wp-content/uploads/2014/08/placeholder.png'
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
//TODO: add product hook that truncates description for a quick description/product view.

module.exports = Product
