'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const CartItem = db.define('cartItems', {})

module.exports = CartItem
