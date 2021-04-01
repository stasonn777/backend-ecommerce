const express = require('express')
const router = express.Router()
const userauth = require('../middleware/userauth')
const { body, validationResult } = require('express-validator')

const Product = require('../models/Product')

// @route       GET api/products
// @desc        Get all products
// @access      Public
router.get('/', (req, res) => {
  res.send('Get all products')
})

// @route       POST api/products
// @desc        Create products 
// @access      Privat
router.post('/', [userauth, [
    body('title', 'Title is required').not().isEmpty(),
    body('featuredImg', 'Featured Image is required').not().isEmpty(),
    body('brand', 'Brand is required').not().isEmpty(),
    body('price', 'Price is required').not().isEmpty(),
    body('countInStock', 'Stock is required').not().isEmpty(),
  ]
], 
async (req, res) => {
  const errors = validationResult(req, res)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {title, featuredImg, images, brand, description, price, countInStock, rating, options, categories, reviews} = req.body

    try {
      let product = await Product.findOne({title}) // Check if customer exists
    if (product) {
      return res.status(400).json({msg: 'Title should be unique'})
    }

      product = new Product({
        title, featuredImg, images, brand, description, price, countInStock, rating, options, categories, reviews, user: req.user.id
      })

      const newProduct = await product.save()
      res.json(newProduct)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
})

// @route       PUT api/products/:id
// @desc        Update product 
// @access      Privat
router.put('/:id', (req, res) => {
  res.send('Update product')
})

// @route       DELETE api/products/:id
// @desc        Delete product 
// @access      Privat
router.delete('/:id', (req, res) => {
  res.send('Delete product')
})

module.exports = router