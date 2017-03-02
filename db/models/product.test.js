'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const Product = require('./product')
const {expect} = require('chai')

describe('Product', () => {

  before('wait for the db', () => db.didSync)

  var newProduct
  beforeEach(() => {
    newProduct = Product.build({
      title: 'Rad Hoodie',
      price: 19.95,
      product_type: 'clothing',
      tags: ['new item', 'rad', 'hoodie']
    })
  });

  describe('Model', () => {

    it('has a default image', () => expect(newProduct.imageURL).to.not.be.null)

  })

  describe('Hooks', () => {

    it('hook TEST', () => {
    })

  })

  describe('instanceMethods', () => {

    it('instanceMethod test', () => {
    })

  })
})
