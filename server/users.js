'use strict'; // eslint-disable-line semi

const db = require('APP/db')
const User = db.models.users;

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

const router = require('express').Router();

module.exports = router; // eslint-disable-line new-cap

router.get('/', /*forbidden('only admins can list users'),*/ (req, res, next) => {
  User.findAll()
    .then(users => res.status(200).json(users))
    .catch(next);
});

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then( (user) => {
      console.log('Redirecting...');
      console.log('to /' + user.id);
      // res.redirect(201, '/' + user.id);
      res.redirect(201, `/1`);
    })
    .catch(next);
});

router.get('/:id', /*mustBeLoggedIn,*/ (req, res, next) => {
  console.log('\n\n\nmade it to get id route with', req.params.id, '\n\n\n')
  User.findById(req.params.id)
    .then( (user) => {
      console.log('found user after redirect!', user);
      res.status(200).json(user)
    })
    .catch(next);
})
