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
    //TODO: change default value later
    defaultValue: 'http://www.thebakerymadewithlove.com/wp-content/uploads/2014/08/placeholder.png'
  },
  year: {
    type: Sequelize.INTEGER
    // TODO: validate year digits maybe?
  }
}, {
  //does this work? unclear
  //TODO: Need to figure out this ablum name function
  //currently, the admin or whoever has to manually add the product
  //title. We want to make it so that if the product is an album,
  //the product name is set using the album name and the artist name.
  getterMethods: {
    getAlbumTitle(){
      Artist.findOne({
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
