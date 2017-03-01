'use strict'; // eslint-disable-line semi

const request = require('supertest-as-promised');
const {expect} = require('chai');
const db = require('APP/db');
const Product = require('APP/db/models/product');
const app = require('./start');


/* IMPLEMENT CUSTOM TESTS FOR EACH ROUTE */

describe('/api/products', () => {

  beforeEach('Synchronize and clear database', () => {
    return db.sync({force: true});

    })

  describe('when logged in', () => {


    beforeEach('Add a product', () => {
       return Product.create({
        title: 'Cool jacket',
        price: 99.95,
        quantity: 3,
        product_type: 'clothing',

      })
    })

    it('GET / - retrieves all products', () =>
      request(app)
        .get(`/api/products`)
        .expect(200)
    )

    it('GET /:productId - retrieves a specified product', () =>

      request(app)
        .get(`/api/products/1`)
        .expect(200)
        .then( (res) => {
          expect(res.body.id).to.equal(1);
          expect(res.body.title).to.equal('Cool jacket')
        })
    )

    it('POST - creates a new product', () =>

      request(app)
        .post('/api/products')
        .send({
          title: 'Some Cool Pants',
          description: 'Amazing pants',
          price: 100.50,
          quantity: 4,
          product_type: 'clothing'
        })
        .expect(201)
    )

    it('POST - redirects to the product it just created', () =>

      request(app)
        .post('/api/products')
        .send({
          title: 'Some Cool Pants',
          description: 'Amazing pants',
          price: 100.50,
          quantity: 4,
          product_type: 'clothing'
        })
        .expect(201)
        .redirects(1)
        .then(res => expect(res.body).to.contain({
          title: 'Some Cool Pants',
        }))
   
    )

    it('PUT /:productId - updates a product', () =>
      request(app)
        .put(`/api/products/1`)
        .send({
          title: 'NoSoCool jacket',
          price: 99.91,
          quantity: 2,
          product_type: 'clothing'
        })
    )

    it('DELETE /:productId - deletes a product', () =>
      request(app)
        .delete(`/api/products/1`)
        .send({
          title: 'NoSoCool jacket',
          price: 99.91,
          quantity: 2,
          product_type: 'clothing'
        })
        .expect(204)
    )

    it('GET /:productId/reviews - gets a products reviews', () =>
      request(app)
        .get(`/api/products/1/reviews`)
        .expect(200)
    )

    it('PUT /:productId/reviews/:reviewId - updates a products review', () =>
      request(app)
        .get(`/api/products/1/reviews/1`)
        .expect(200)
    )

    it('DELETE /:productId/reviews/:reviewId - deletes a products review', () =>
      request(app)
        .get(`/api/products/1/reviews/1`)
        .expect(204)
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
