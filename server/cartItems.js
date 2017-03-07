'use strict'

const db = require('APP/db');
const router = require('express').Router();
module.exports = router;

const Orders = db.models.orders
const CartItems = db.models.cartItems
const Product = db.models.products


router.param('userId', (req, res, next, userId) => {
  Orders.findOne({
    where: {
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

//add item to the cart
router.post('/:userId/:prodId', (req, res, next) => {
  CartItems.findOrCreate({where: {
      order_id: req.activeOrder.id,
      product_id: req.params.prodId
    }
  })
  .spread((cartItem, created) => {
    if (created){
      res.json(cartItem)
    } else {
      cartItem.quantity++
      return cartItem.save()
    }
  })
  .then( () => {
    res.sendStatus(204)
  })
  .catch(next)
})

//delete a single cart item
//should change this to "/:cartItemId"
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

//tests hook to make sure that when cart qty is 0, the item is removed
//will probably delete this after update quantity is working.
router.put('/:cartItemId/:newQty', (req, res, next) => {
  CartItems.findById(req.params.cartItemId)
    .then(foundCartItem => {
      foundCartItem.quantity = req.params.newQty
      return foundCartItem.save()
    })
    .then( () => {

      res.sendStatus(204)
    })
})

