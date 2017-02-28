'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const Review = db.define('reviews', {
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    },
    allowNull: false
  },
  title: {
    type: Sequelize.STRING
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: function(review){
      if (!review.title){
        review.title = `${review.body.slice(0,24)}...`
      }
    }
  }
})

module.exports = Review
