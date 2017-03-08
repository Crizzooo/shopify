'use strict'

const db = require('APP/db');
const router = require('express').Router();
module.exports = router;

const Orders = db.models.orders
const CartItems = db.models.cartItems
const Product = db.models.products

// update this so that cart items update quantity properly
router.param('userId', (req, res, next, userId) => {
  Orders.findOrCreate({
    where: {
      user_id: userId,
      status: 'Created'
    }
  })
  .spread((foundOrder, created) => {
      req.activeOrder = foundOrder
      next();
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

//add item to the cart
router.post('/:userId/:prodId', (req, res, next) => {
  CartItems.findOrCreate({where: {
      order_id: req.activeOrder.id,
      product_id: req.params.prodId
    }
  })
  .spread((cartItem, created) => {
    if (!created){
      cartItem.quantity++
      return cartItem.save()
      }
   })
    .then( (cartItem) => {
        res.json(cartItem)
  })
  .catch(next)
})

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

//update cart qty
router.put('/:cartItemId/:newQty', (req, res, next) => {
  CartItems.findById(req.params.cartItemId)
    .then(foundCartItem => {
      foundCartItem.quantity = req.params.newQty
      return foundCartItem.save()
    })
    .then( () => {
      res.sendStatus(204)
    })
    .catch(next)
})

