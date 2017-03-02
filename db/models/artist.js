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
    type: Sequelize.BLOB,
    defaultValue: '../images/artist_photo_placeholder'
  }
})

module.exports = Artist
