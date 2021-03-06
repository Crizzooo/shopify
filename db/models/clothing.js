'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const Clothing = db.define('clothing', {
  type: {
    type: Sequelize.ENUM('tshirt', 'pants', 'hat')
  },
  size: {
    type: Sequelize.ENUM('S', 'M', 'L', 'one-size')
  }
  // TODO: CREATE? price: Sequelize.DECIMAL(10, 2)
})

module.exports = Clothing
