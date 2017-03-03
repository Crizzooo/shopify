'use strict'; // eslint-disable-line semi

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Address = require('./address')
const Order = require('./order')
const Review = require('./review')
const Product = require('./product')
const Category = require('./category')
const productCatPivot = require('./productCategoryPivot');
const CartItem = require('./cartItem')
const Album = require('./album')
const Artist = require('./artist')
const Clothing = require('./clothing')
const OAuth = require('./oauth')

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(Address)

Product.hasMany(Review)
Review.belongsTo(Product)

/* Setting Pivot table up for ManyToMany relationship
http://docs.sequelizejs.com/en/latest/api/associations/belongs-to-many/ */
Product.belongsToMany(Category, {through: productCatPivot});
Category.belongsToMany(Product, {through: productCatPivot});

Product.hasMany(Album)
Album.belongsTo(Product)

Product.hasMany(Clothing)
Clothing.belongsTo(Product)

Order.hasMany(CartItem)
CartItem.belongsTo(Product)
CartItem.belongsTo(Order)

Clothing.belongsTo(Artist)
Artist.hasMany(Clothing)

Artist.hasMany(Album)
Album.belongsTo(Artist)

User.hasOne(OAuth)
OAuth.belongsTo(User)

module.exports = {User, Address, Order, Review, Product, CartItem, Album, Artist, Clothing}
