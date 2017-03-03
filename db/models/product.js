'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')
const Album = require('./album')

const Product = db.define('products', {
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  description: Sequelize.TEXT,
  imageURL: {
    type: Sequelize.BLOB,
    defaultValue: '../images/product_image_coming_soon'
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
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
  product_type: Sequelize.ENUM('album', 'clothing')
  },
  {
  hooks: {
    beforeCreate: function(product){
      if (product.type === 'album'){
        Album.getAlbumTitle(product)
        .then((albumNameString) => {
          product.title = albumNameString
        })
      }
    }
  },
  instanceMethods: {
    truncateDescription() {
      return `${this.description.slice(0, 48)}...`
    }
  }
})

module.exports = Product
