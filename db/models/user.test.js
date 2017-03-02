'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const User = require('./user')
const {expect} = require('chai')

describe('User', () => {

  before('wait for the db', () => db.didSync)

  var newUser;
  beforeEach(() => {
    newUser = User.build({
      firstName: 'Alex',
      lastName: 'Varona',
      password: '123',
      email: 'example@gmail.com',
      isAdmin: true
    });
  });
  describe('Model', () => {

    it('includes first & last name, email and shipping address headers', () => {
      return newUser.save()
      .then((user) => {
        expect(user.firstName).to.equal('Alex')
        expect(user.lastName).to.equal('Varona')
        expect(user.email).to.equal('example@gmail.com')
        expect(user.isAdmin).to.equal(true)
      })
    })

    it('`Name` and `email` cannot be blank or null', () => {
      newUser.firstName = '';
      newUser.lastName = 'Hancock';
      newUser.email = null;

      return newUser.validate()
      .then(function(user) {
        expect(user).to.be.an.instanceOf(Error)
      })
    })

    it('includes `isAdmin` that is a boolean', () => {
      expect(newUser.isAdmin).to.be.a('boolean')
    })
  })

  describe('getterMethods', () => {
    it('has fullName getterMethod that concats firstName and lastName', () => {
      var fullName = `${newUser.firstName} ${newUser.lastName}`
        expect(newUser.fullName).to.be.a('string')
        expect(newUser.fullName).to.equal(fullName)

    })
  })

  describe('Password Authentication', () => {

    describe('authenticate(plaintext: String) ~> Boolean', () => {
      it('resolves true if the password matches', () =>
      User.create({
        firstName: 'Bill',
        lastName: 'Nye',
        email: 'bill@nye.com',
        password: 'ok'
        })
      .then(user => user.authenticate('ok'))
      .then(result => expect(result).to.be.true))

      it("resolves false if the password doesn't match", () =>
      User.create({
        firstName: 'Jill',
        lastName: 'Lye',
        email: 'jill@lye.com',
        password: 'ok'
      })
      .then(user => user.authenticate('not ok'))
      .then(result => expect(result).to.be.false))
    })

  })

})
