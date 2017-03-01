'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const User = require('./user')
const {expect} = require('chai')

describe('User', () => {

  before('wait for the db', () => db.didSync)

  // describe('Model', () => {
  //   var newUser;
  //   beforeEach(() => {
  //     newUser = User.build({
  //       firstName: 'Alex',
  //       lastName: 'Varona',
  //       password: '123',
  //       email: 'example@gmail.com',
  //       isAdmin: true
  //     });
  //   });
  //
  //   it('includes first & last name, email and shipping address headers', () => {
  //     return newUser.save()
  //     .then((user) => {
  //       expect(user.firstName).to.equal('Alex')
  //       expect(user.lastName).to.equal('Varona')
  //       expect(user.email).to.equal('example@gmail.com')
  //       expect(user.isAdmin).to.equal(true)
  //     })
  //   })
  //
  //   it('`Name` and `email` cannot be blank', () => {
  //
  //     // TODO: TEST create null and '' tests separately? how to check whether error is thrown back?
  //     newUser.firstName = 'sdfg';
  //     newUser.lastName = 'sdfg';
  //     newUser.email = ' sdfg';
  //
  //     return newUser.validate()
  //     .then(function(user) {
  //       expect(user).to.be.an.instanceOf(Error)
  //     })
  //   })
  //
  //   it('includes `isAdmin` that is a boolean', () => {
  //     expect(newUser.isAdmin).to.be.equal(true)
  //   })
  // })

  describe('Password Authentication', () => {

    describe('authenticate(plaintext: String) ~> Boolean', () => {
      it('resolves true if the password matches', () =>
      User.create({ password: 'ok' })
      .then(user => user.authenticate('ok'))
      .then(result => expect(result).to.be.true))

      it("resolves false if the password doesn't match", () =>
      User.create({ password: 'ok' })
      .then(user => {
        console.log(user)
        user.authenticate('not ok')
      })
      .then(result => expect(result).to.be.false))
    })

  })

  describe('Virtuals', () => {
    it('exists', () => {

    })

    it('concats the user\'s first and last name into a single field', () => {
      expect()
    })

  })

  describe('Hooks', () => {
    it('sets email & password before user creation', () => {
      expect()
    })

    it('sets email & password before user update', () => {
      expect()
    })
  })
})
