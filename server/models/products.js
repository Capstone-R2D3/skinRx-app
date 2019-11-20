const Sequelize = require('sequelize')
const {db} = require('./index')

const Products = db.define('products', {
  name: {
    type: Sequelize.STRING
  }
})

module.exports = Products