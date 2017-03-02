'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Artist = require('./artist')
const {expect} = require('chai')

describe('Artist', () => {

  before('wait for the db', () => db.didSync)

  var newArtist
  beforeEach(() => {
    newArtist = Artist.build({
      name: null
    })
  });

  describe('Model', () => {

    it('artist name cannot be null', () => {
      return newArtist.validate()
      .then((artist) => {
        expect(artist).to.be.an.instanceOf(Error)
      })
    })

    it('artist image has default placeholder image', () => {
      newArtist.name = 'The Beatles'
      return newArtist.save()
      .then((artist) => expect(artist.imageURL).to.not.be.null)
    })

  })

})
