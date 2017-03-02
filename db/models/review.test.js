'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Review = require('./review')
const {expect} = require('chai')

describe('Review', () => {

  before('wait for the db', () => db.didSync)

  var newReview
  beforeEach(() => {
    newReview = Review.build({
      rating: 5,
      body: 'This is an excellent review, probably the best I\'ve ever given to any product. This shit is top notch! Buy it now, or else...Don\'t want to end with elipses'
    })
  });

  describe('Model', () => {

    it('rating should be an integer from 1 to 5', () => {
        expect(newReview.rating).to.be.a('number')
        expect(newReview.rating).to.be.within(1, 5)
    })


  })

  describe('Hooks', () => {

    it('generates a title if none is given', () => {
      expect(newReview.title).to.be.an('undefined')
      return newReview.save()
      .then((review) => {
        expect(review.title).to.be.a('string')
        expect(review.title).to.equal('This is an excellent rev...')
      })

    })

  })
})
