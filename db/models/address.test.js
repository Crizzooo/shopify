'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Address = require('./address')
const {expect} = require('chai')

describe('Address', () => {

  before('wait for the db', () => db.didSync)

  var newAddress;
  beforeEach(() => {
    newAddress = Address.build({
      buildingNumber: '123 Main Street',
      city: 'Generic',
      state: 'NYC',
      zip: '1245'
    });
  });

  describe('Model', () => {

    it('number, city and state cannot be null or empty string', () => {
      newAddress.buildingNumber = null
      newAddress.city = ''
      newAddress.state = 'NY'

      return newAddress.validate()
      .then((address) => {
        expect(address).to.be.an.instanceOf(Error)
      })
    })

    it('has `state` as having length of 2 and `zip` as 5', () => {

      return newAddress.validate()
      .then((address) => {
        expect(address).to.be.an.instanceOf(Error)
      })

    })
  })
})
