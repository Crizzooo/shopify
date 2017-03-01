'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Order = require('./order')
const {expect} = require('chai')

describe('Order', () => {

  before('wait for the db', () => db.didSync)

  var newOrder;
  beforeEach(() => {
    newOrder = Order.build()
  });

  describe('Model', () => {

    it('inlcludes a status and isActive by default', () => {
      console.log(newOrder)
      expect(newOrder.status).to.equal('Created')
      expect(newOrder.isActive).to.equal(true)
    })
    //TODO: TEST tests for product
  })

})
