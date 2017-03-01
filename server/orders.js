'use strict'

const db = require('APP/db');
const router = require('express').Router();
module.exports = router;

const Orders = db.models.orders
// const Reviews = db.model('reviews');
// const Albums = db.model('albums');
// const Artists = db.model('artists');



// PARAMS

router.param('orderId', function (req, res, next, orderId){
	if (isNaN(orderId)) {
		let err = Error('Invalid Order ID');
		err.status = 404;
		throw err;
	}

	Orders.findById(orderId)
	.then(function (order) {
	  if (!order) {
	    const err = Error('Order not found');
	    err.status = 404;
	    throw err;
	  }
		console.log('saving: ', order, ' to req.order');
	  req.order = order;
	  next();
	})
	.catch(next);
});

/// ORDERS

router.get('/', function (req, res, next){
	console.log('in get orders /');
	Orders.findAll()
	.then( (orders) => {
		// console.log('found orders', orders);
		res.status(200).json(orders);
	})
	.catch(next);
});

router.get('/:orderId', function (req, res, next){
	res.status(200).json(req.order)
});

router.put('/:orderId', function (req, res, next){
	req.order.update(req.body)
	.then( order => res.status(200).json(order))
	.catch(next)
});

router.post('/', function (req, res, next){
	Orders.create(req.body)
	.then( order => res.status(200).json(order))
	.catch(next);
});

router.delete('/:orderId', function (req, res, next){
	req.order.destroy()
	.then( () => res.status(204).send('Succesfully Deleted'))
	.catch(next)
});
