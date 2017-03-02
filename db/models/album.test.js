'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Album = require('./album')
const Artist = require('./artist')
const {expect} = require('chai')

describe('Album', () => {

  before('wait for the db', () => db.didSync)

  var newAlbum, newArtist
  beforeEach(() => {
    newAlbum = Album.create({
      name: 'Rubber Soul',
      genre: 'instrumental'
    });
  });
  newArtist = Artist.create({
    name: 'The Beatles'
  })

  describe('Model', () => {

    it('has a default placeholder image', () =>{
      return newAlbum
      .then((album) => expect(album.imageURL).to.not.be.null)
    })
  })


  describe('getterMethods', () => {

    it('creates a composite title of album and artist name', () => {
      // TODO: TEST album getter method
      Promise.all([newArtist, newAlbum])
      .then((artistAndAlbum) => {
        const artist = artistAndAlbum[0].name
        const album = artistAndAlbum[1].name
        const albumInstance = artistAndAlbum[1]
      })
    })

  })

})
