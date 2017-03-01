'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const Address = db.define('addresses', {
  buildingNumber: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  city: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      len: 2
    }
  },
  zip: {
    type: Sequelize.INTEGER,
    validate: {
      len: 5
    }
  }
})

module.exports = Address
