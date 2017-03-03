const Sequelize = require('sequelize')
const db = require('APP/db')

const pivot = db.define('productCategoryPivot', {})

module.exports = pivot;
