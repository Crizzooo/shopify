'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')

const Artist = db.define('artists', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageURL: {
    type: Sequelize.STRING,
    //TODO: CHANGE artist image defaultValue
    defaultValue: 'http://www.thebakerymadewithlove.com/wp-content/uploads/2014/08/placeholder.png'
  }
})

module.exports = Artist
