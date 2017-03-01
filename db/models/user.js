'use strict'; // eslint-disable-line semi
/* eslint-disable camelcase */

// bcrypt docs: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')
const db = require('APP/db')

const User = db.define('users', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
			isEmail: true,
			notEmpty: true
		}
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  // TODO: DELETE shippingAddress
  // already associated with the address model
  // shippingAddress: {
  //   type: Sequelize.STRING
  // },

  // We support oauth, so users may or may not have passwords.
  password_digest: Sequelize.STRING, // This column stores the hashed password in the DB, via the beforeCreate/beforeUpdate hooks
	password: Sequelize.VIRTUAL // Note that this is a virtual, and not actually stored in DB
}, {
	indexes: [{fields: ['email'], unique: true}],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword
      // TODO: DELETE hook to format address
      // function(user) {
      //   if (!user.shippingAddress) {
      //     return Address.findOne({
      //       where: {
      //         id: this.address_id
      //       }
      //     })
      //     .then(function(userAddress) {
      //       this.shippingAddress = `${userAddress.buildingNumber} \n${userAddress.city}, ${userAddress.state} ${userAddress.zip}`
      //     })
      //   }
      // }
  },
  getterMethods: {
    fullName(){
      return `${this.firstName} ${this.lastName}`
    }
  },
  instanceMethods: {
    // This method is a Promisified bcrypt.compare
    authenticate (plaintext) {
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.password_digest, (err, result) => {
          if (err) reject(err)
          else resolve(result)
        })
      )
    }
  }
})

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)
  return new Promise((resolve, reject) =>
	  bcrypt.hash(user.get('password'), 10, (err, hash) => {
		  if (err) reject(err)
		  user.set('password_digest', hash)
      resolve(user)
	  })
  )
}

module.exports = User
