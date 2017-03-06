'use strict'

const db = require('APP/db');
const router = require('express').Router();
module.exports = router;

const Orders = db.models.orders
const CartItems = db.models.cartItems
const Product = db.models.products


router.param('userId', (req, res, next, userId) => {
  Orders.findOne({
    where : {
      user_id: userId,
      status: 'Created'
    }
  })
  .then(foundOrder => {
    if(!foundOrder) {
      res.sendStatus(404)
    } else {
      req.activeOrder = foundOrder
      next();
    }
  })
})

//get all cart items
router.get('/:userId', (req, res, next) => {
    CartItems.findAll({
      where: {
        order_id: req.activeOrder.id
      }, include: [{model: Product}]
    })
    .then(foundCartItems => {
      res.json(foundCartItems)
    })
    .catch(next)
  })


//delete a single cart item

router.delete('/:prodId', (req, res, next) => {
  CartItems.destroy({
    where: {
      product_id: req.params.prodId
    }
  })
  .then( () => {
    res.sendStatus(204)
  })
  .catch(next)
})

