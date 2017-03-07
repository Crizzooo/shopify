'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const CartItem = db.define('cartItems', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  price_paid: {
    type: Sequelize.DECIMAL(10, 2)
  }
},
  {
    hooks: {
      afterSave(cartItem) {
        if(cartItem.quantity === 0) {
          return cartItem.destroy()
      }
    }
  }
})

module.exports = CartItem
