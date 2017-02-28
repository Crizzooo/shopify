'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const Order = db.define('orders', {
  status: {
    type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
    defaultValue: 'Created'
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  items: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  }
})

module.exports = Order
