'use strict'; // eslint-disable-line semi

const request = require('supertest-as-promised');
const {expect} = require('chai');
const db = require('APP/db');
const Order = require('APP/db/models/order');
const app = require('./start');


//THESE TESTS ARE RUN ASSUMING THE DATABASE LOOKS LIKE THE SEED filters

/* IMPLEMENT CUSTOM TESTS FOR EACH ROUTE */
describe('/api/orders', () => {
  describe('Block 1: Order functionality when not logged in', () => {
    //TODO: eventually only serve this route to logged in Users / Admins
    it('GET / Returns all Orders', () => {
      request(app)
        .get(`/api/orders`)
        .then( (res) => {
          // console.log('Received', res.body);
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(2);
        })
    })

    it('GET /api/:orderId finds an order', () => {
      request(app)
        .get('/api/orders/1')
        .then( (res) => {
          console.log('found order', res.body);
          // expect(res.body.to.)
          expect(200);
        })
    })

    it('PUT /api/:orderId successfully updates an order', () => {
      request(app)
        .put('/api/orders/2')
        .send({
          status: 'Processing'
        })
        .then( (res) => {
          // console.log('found order', res.body);
          expect(res.body.status).to.equal('Created');
          expect(200);
        })
    })

    it('POST /api/orders successfully creates a  new order', () => {
      request(app)
        .post('/api/orders')
        .send({
          status: 'Created',
          items: [1, 2, 3],
          user_id: 2
        })
        .then( (res) => {
          console.log('created order:', res.body);
          expect(res.body.user_id).to.equal(2);
          expect(200);
        })
    })

    it('DELETE /api/orders successfully destroys an instance', () => {
      request(app)
        .delete('/api/orders/1')
        .expect(204);
    })

    //   EXAMPLE
    // it('POST redirects to the user it just made', () =>
    //   request(app)
    //     .post('/api/orders')
    //     .send({
    //       email: 'eve@interloper.com',
    //       password: '23456',
    //     })
    //     .redirects(1)
    //     .then(res => expect(res.body).to.contain({
    //       email: 'eve@interloper.com'
    //     }))
    // )
  })
})
