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
}, {
  // TODO: QUESTION getter and instance methods still relevant?
  getterMethods: {
    cartContents(){
      const cart = {}
      this.items.forEach(item => {
        if (cart[item]) cart[item]++;
        else cart[item] = 1
      })
    }
  },
  instanceMethods: {
    addToCart(product){
      this.items.push(product.id)
    }
  }
})

module.exports = Order
