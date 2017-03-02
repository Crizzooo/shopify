'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

const Sequelize = require('sequelize')
const db = require('APP/db')
const Artist = require('./artist')

const Album = db.define('albums', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageURL: {
    type: Sequelize.BLOB,
    defaultValue: '../images/album_placeholder'
  },
  year: {
    type: Sequelize.INTEGER,
    validate: {
      len: 4
    }
  }
  // TODO: CREATE? price: Sequelize.DECIMAL(10, 2)
}, {
  //currently, the admin or whoever has to manually add the product
  //title. We want to make it so that if the product is an album,
  //the product name is set using the album name and the artist name.

  getterMethods: {
    getAlbumTitle(){
      return Artist.findById(this.artist_id)
      .then((foundArtist) => {
        console.log(this.name + ' - ' + foundArtist.name)
        return this.name + ' - ' + foundArtist.name
      })
    }
  }
})

module.exports = Album
