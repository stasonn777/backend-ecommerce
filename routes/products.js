const express = require('express')
const router = express.Router()
const userauth = require('../middleware/userauth')
const { body, validationResult } = require('express-validator')

const Product = require('../models/Product')

// @route       GET api/products
// @desc        Get all products
// @access      Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route       GET api/products/:id
// @desc        Get single product
// @access      Public
router.get('/:id', async (req, res) => {
  try {
    let product = await Product.findById(req.params.id)
    res.json(product)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route       POST api/products
// @desc        Create products
// @access      Privat
router.post(
  '/',
  [
    userauth,
    [
      body('title', 'Title is required').not().isEmpty(),
      // body('featuredImg', 'Featured Image is required').not().isEmpty(),
      body('brand', 'Brand is required').not().isEmpty(),
      body('price', 'Price is required').not().isEmpty(),
      body('countInStock', 'Stock is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req, res)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      title,
      featuredImg,
      images,
      brand,
      description,
      price,
      countInStock,
      rating,
      options,
      categories,
      reviews,
      user,
    } = req.body

    try {
      let product = await Product.findOne({ title }) // Check if customer exists
      if (product) {
        return res.status(400).json({ msg: 'Title should be unique' })
      }

      product = new Product({
        title,
        featuredImg,
        images,
        brand,
        description,
        price,
        countInStock,
        rating,
        options,
        categories,
        reviews,
        user: req.user.id,
      })

      const newProduct = await product.save()
      res.json(newProduct)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route       PUT api/products/:id
// @desc        Update product
// @access      Privat
router.put('/:id', userauth, async (req, res) => {
  const {
    title,
    featuredImg,
    images,
    brand,
    description,
    price,
    countInStock,
    rating,
    options,
    categories,
    reviews,
    user,
  } = req.body

  // Build product object
  const productFields = {}
  if (title) productFields.title = title
  if (featuredImg) productFields.featuredImg = featuredImg
  if (images) productFields.images = images
  if (brand) productFields.brand = brand
  if (description) productFields.description = description
  if (price) productFields.price = price
  if (countInStock) productFields.countInStock = countInStock
  if (rating) productFields.rating = rating
  if (options) productFields.options = options
  if (categories) productFields.categories = categories
  if (reviews) productFields.reviews = reviews
  if (user) productFields.user = user

  try {
    let product = await Product.findById(req.params.id)

    if (!product) return res.status(404).json({ msg: 'Product not found' })

    // Make sure user not customer
    if (!req.user) {
      return res.status(401).json({ msg: 'User not authorized' })
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    )

    res.json(product)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route       DELETE api/products/:id
// @desc        Delete product
// @access      Privat
router.delete('/:id', userauth, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id)

    if (!product) return res.status(404).json({ msg: 'Product not found' })

    // Make sure user not customer
    if (!req.user) {
      return res.status(401).json({ msg: 'User not authorized' })
    }

    await Product.findByIdAndRemove(req.params.id)

    res.json({ msg: 'Product successfully remover'})
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
