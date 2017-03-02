'use strict'; // eslint-disable-line semi

const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('APP/db')
const User = require('APP/db/models/user')
const app = require('./start')

describe('/api/users', () => {

  beforeEach('Synchronize and clear database', () => {
    return db.sync({force: true});

  })


  describe('when not logged in', () => {
    xit('GET /:id fails 401 (Unauthorized)', () =>
      request(app)
        .get(`/api/users/1`)
        .expect(401)
    )

    it('POST creates a user', () =>
      request(app)
        .post('/api/users')
        .send({
          email: 'beth@secrets.org',
          password: '12345'
        })
        .expect(201)
        .then( () => {
          return request(app)
                        .get('/api/users')
                        .expect(200)
                        .then( (res) => {
                          expect(res.body.length).to.equal(1);
                          expect(res.body[0]).to.have.property('email', 'beth@secrets.org')
                        })
        })
    )

    it('POST redirects to the user it just made', () =>
      request(app)
        .post('/api/users')
        .send({
          email: 'eve@interloper.com',
          password: '23456',
        })
        .redirects(1)
        .then( (res) => {
          console.log('received ', res)
          expect(res.body).to.contain({
          email: 'eve@interloper.com'
          })
        })
    )
  })
})
