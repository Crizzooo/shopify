'use strict'; // eslint-disable-line semi

const request = require('supertest-as-promised');
const {expect} = require('chai');
const db = require('APP/db');
const Product = require('APP/db/models/product');
const app = require('./start');


/* IMPLEMENT CUSTOM TESTS FOR EACH ROUTE */

describe('/api/products', () => {

  describe('when logged in', () => {

    xit('GET /', () =>
      request(app)
        .get(`/api/products`)
        .expect(200)
    )

    xit('GET /:productId', () =>
      request(app)
        .get(`/api/products/1`)
        .expect(200)
    )

    xit('POST creates a product', () =>
      request(app)
        .post('/api/products')
        .send({
          title: 'Some Cool Pants',
          description: 'Amazing pants',
          price: 100.50,
          quantity: 4,
          product_type: 'clothing'
        })
        .expect(200)
    )


    xit('POST redirects to the product it just created', () =>
      request(app)
        .post('/api/products')
        .send({
          title: 'Some Cool Pants',
          description: 'Amazing pants',
          price: 100.50,
          quantity: 4,
          product_type: 'clothing'
        })
        .redirects(1)
        .then(res => expect(res.body).to.contain({
          title: 'Some Cool Pants',
        }))
    )
  })
})


// describe('/api/users', () => {
//   describe('when not logged in', () => {
//     it('GET /:id fails 401 (Unauthorized)', () =>
//       request(app)
//         .get(`/api/users/1`)
//         .expect(401)
//     )
//
//     it('POST creates a user', () =>
//       request(app)
//         .post('/api/users')
//         .send({
//           email: 'beth@secrets.org',
//           password: '12345'
//         })
//         .expect(201)
//     )
//
//     it('POST redirects to the user it just made', () =>
//       request(app)
//         .post('/api/users')
//         .send({
//           email: 'eve@interloper.com',
//           password: '23456',
//         })
//         .redirects(1)
//         .then(res => expect(res.body).to.contain({
//           email: 'eve@interloper.com'
//         }))
//     )
//   })
// })
