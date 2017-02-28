'use strict'; // eslint-disable-line semi

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user')
const Order = require('./order')
const Review = require('./review')
const Product = require('./product')
const Album = require('./album')
const Artist = require('./artist')
const Clothing = require('./clothing')
const OAuth = require('./oauth')

User.hasMany(Order)
User.hasMany(Review)
Order.belongsTo(User)
Review.belongsTo(User)
Product.hasMany(Review)
Review.belongsTo(Product)
Album.belongsTo(Artist)
Clothing.belongsTo(Artist)
Artist.hasMany(Album)
Artist.hasMany(Clothing)

OAuth.belongsTo(User)
User.hasOne(OAuth)
module.exports = {User, Order, Review, Product, Album, Artist, Clothing}
