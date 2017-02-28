'use strict'

const db = require('APP/db');
const router = require('express').Router();
module.exports = router;

const Orders = db.models.orders
// const Reviews = db.model('reviews');
// const Albums = db.model('albums');
// const Artists = db.model('artists');



// PARAMS

router.param('orderId', function (req, res, next){
	if (isNaN(req.params.orderId)) {
		let err = Error('Invalid Order ID');
		err.status = 404;
		throw err;
	}

	Orders.findById(req.params.orderId)
	.then(function (order) {
	  if (!order) {
	    const err = Error('Order not found');
	    err.status = 404;
	    throw err;
	  }
	  req.order = order;
	  next();
	})
	.catch(next);
});

// router.param('reviewId', function (req, res, next){

// 	if (isNaN(req.params.reviewId)) {
// 		let err = Error('Invalid review ID');
// 		err.status = 404;
// 		throw err;
// 	}

// 	Reviews.findById(req.params.reviewId)
// 	.then(function (review) {
// 	  if (!review) {
// 	    const err = Error('review not found');
// 	    err.status = 404;
// 	    throw err;
// 	  }
// 	  req.review = review;
// 	  next();
// 	})
// 	.catch(next);
// });


/// ORDERS

router.get('/', function (req, res, next){
	Orders.findAll()
	.then( orders => res.status(200).json(orders))
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
