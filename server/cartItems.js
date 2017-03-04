'use strict'

const db = require('APP/db');
const router = require('express').Router();
module.exports = router;

const Orders = db.models.orders
const CartItems = db.models.cartItems


router.get('/:userId', (req, res, next) => {
  Orders.findOne(
  {
    where: {
      user_id: req.params.userId, //this is hard-coded for now
      status: 'Created'
    }
  })
  .then(foundOrder => {
    if(!foundOrder) res.status(404).send()
    CartItems.findAll(
    {
      where: {
        order_id: foundOrder.id
      }
    })
    .then(foundCartItems => {
      res.json(foundCartItems)
    })
  })
})
