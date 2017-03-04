'use strict'

const db = require('APP/db');
const router = require('express').Router();
module.exports = router;

const Orders = db.models.orders
const CartItems = db.models.cartItems
const Product = db.models.products


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
      // include : {
      //   model: Product, where: {order_id : foundOrder.id}
      // }
      where: {
        order_id: foundOrder.id
      }, include: [{model: Product}]
    })
    .then(foundCartItems => {
      res.json(foundCartItems)
    })
  })
})
