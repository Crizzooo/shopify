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
    type: Sequelize.STRING,
    //TODO: CHANGE album image defaultValue
    defaultValue: 'http://www.thebakerymadewithlove.com/wp-content/uploads/2014/08/placeholder.png'
  },
  year: {
    type: Sequelize.INTEGER,
    validate: {
      len: [4]
    }
  }
}, {
  //currently, the admin or whoever has to manually add the product
  //title. We want to make it so that if the product is an album,
  //the product name is set using the album name and the artist name.

  //TODO: CREATE write a function that grabs the album name and artist name and sends it to product name. Should it be a getter?
  getterMethods: {
    getAlbumTitle(){
      return Artist.findOne({
        where: {
          id: this.artist_id
        }
      })
      .then(function(foundArtist){
        return this.name + ' - ' + foundArtist.name
      })
      .catch(console.error)
    }
  }
})

module.exports = Album
