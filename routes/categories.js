const express = require('express')
const router = express.Router()
const userauth = require('../middleware/userauth')

const Category = require('../models/productCategories')

// @route       GET api/categories
// @desc        Get all categories
// @access      Public
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route       GET api/categories/:id
// @desc        Get single category
// @access      Public
router.get('/:id', async (req, res) => {
  try {
    let category = await Category.findById(req.params.id)
    res.json(category)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route       POST api/categories
// @desc        Create categories
// @access      Privat
router.post('/', userauth, async (req, res) => {
  const { name, image, slug, description, parent, products } = req.body

  try {
    let category = await Category.findOne({ name })
    if (category) {
      return res.status(400).json({ msg: 'Name should be unique' })
    }

    category = new Category({
      name,
      image,
      slug,
      description,
      parent,
      products,
    })

    const newCategory = await category.save()
    res.json(newCategory)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route       PUT api/categories/:id
// @desc        Update category
// @access      Privat
router.put('/:id', userauth, async (req, res) => {
  const { name, image, slug, description, parent, products } = req.body

  // Build product object
  const categoryFields = {}
  if (name) categoryFields.name = name
  if (slug) categoryFields.slug = slug
  if (image) categoryFields.image = image
  if (description) categoryFields.description = description
  if (parent) categoryFields.parent = parent
  if (products) categoryFields.products = products

  try {
    let category = await Category.findById(req.params.id)

    if (!category) return res.status(404).json({ msg: 'Category not found' })

    // Make sure user not customer
    if (!req.user) {
      return res.status(401).json({ msg: 'User not authorized' })
    }

    category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: categoryFields },
      { new: true }
    )

    res.json(category)
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ msg: err.message, type: 'Server error' })
  }
})

// @route       DELETE api/categories/:id
// @desc        Delete category
// @access      Privat
router.delete('/:id', userauth, async (req, res) => {
  try {
    let category = await Category.findById(req.params.id)

    if (!category) return res.status(404).json({ msg: 'Category not found' })

    // Make sure user not customer
    if (!req.user) {
      return res.status(401).json({ msg: 'User not authorized' })
    }

    await Category.findByIdAndRemove(req.params.id)

    res.json({ msg: 'Category successfully remover' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
