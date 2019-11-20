const Products = require('../models/products')
const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try {
    const products = await Products.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

module.exports = router