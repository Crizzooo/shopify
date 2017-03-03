'use strict'

const db = require('APP/db');
const router = require('express').Router();
module.exports = router;

const Products = db.models.products;
const Reviews = db.models.reviews;
const Albums = db.model('albums');
const Artists = db.model('artists');
const Clothing = db.model('clothing');

// PARAMS
router.param('productId', function (req, res, next, productId){
	if (isNaN(req.params.productId)) {
		let err = Error('Invalid Product ID')
		err.status = 404;
		throw err;
	}
	Products.findById(productId)
	.then( (product) => {
	  if (!product) {
	    const err = Error('product not found');
	    err.status = 404;
	    throw err;
	  }
	  req.product = product;
	  next();
	})
	.catch(next);
});

router.param('reviewId', function (req, res, next){

	if (isNaN(req.params.reviewId)) {
		let err = Error('Invalid review ID');
		err.status = 404;
		throw err;
	}

	Reviews.findById(req.params.reviewId)
	.then(function (review) {
	  if (!review) {
	    const err = Error('review not found');
	    err.status = 404;
	    throw err;
	  }
	  req.review = review;
	  next();
	})
	.catch(next);
});


/// PRODUCTS

router.get('/', function (req, res, next){
	Products.findAll()
	.then( products => res.status(200).json(products))
	.catch(next);
});

router.get('/albums', (req, res, next) => {
	Albums.findAll({
		include: [ Products, Artists ]
	})
	.then( (result) => {
		console.log('get all albums route received:', result);
		res.status(200).json(result);
	})
	.catch(next);
})

router.get('/clothing', (req, res, next) => {
	Clothing.findAll({
		include: [ Products, Artists ]
	})
	.then( (result) => {
		console.log('get all clothing route received:', result);
		res.status(200).json(result);
	})
	.catch(next);
})

router.get('/:productId', function (req, res, next){
	Products.findById(req.params.productId)
	.then( product => res.status(200).json(product))
	.catch(next);
});

router.put('/:productId', function (req, res, next){
	req.product.update(req.body)
	.then( product => res.status(200).json(product))
	.catch(next)
});

router.post('/', function (req, res, next){
	Products.create(req.body)
	.then( product => {
		console.log('created this product!:', product);
		res.status(201).json(product);
	})
	.catch(next);
});

router.delete('/:productId', function (req, res, next){
	req.product.destroy()
	.then( () => res.status(204).send('Succesfully Deleted'))
	.catch(next)
});


/// REVIEWS

router.get('/:productId/reviews', function (req, res, next){
	Reviews.findAll({
		where: {
			product_id: req.product.id
		}
	})
	.then( reviews => res.status(200).json(reviews))
	.catch(next)
});

router.post('/:productId/reviews', function (req, res, next){
	Reviews.create(req.body)
	.then( review => review.setProduct(req.product.id))
	.then( review => res.status(201).json(review))
	.catch(next)
});

router.put('/:productId/reviews/:reviewId', function (req, res, next){
	req.review.update(req.body)
	.then( review => res.status(200).json(review))
	.catch(next)
});

router.delete('/:productId/reviews/:reviewId', function (req, res, next){
	req.review.destroy(req.body)
	.then(() => res.status(204).send('Succesfully Deleted'))
	.catch(next)
});
