const express = require('express')
const router = express.Router()

// @route       GET api/products
// @desc        Get all products
// @access      Public
router.get('/', (req, res) => {
  res.send('Get all products')
})

// @route       POST api/products
// @desc        Create products 
// @access      Public
router.post('/', (req, res) => {
  res.send('Create new product')
})

// @route       PUT api/products/:id
// @desc        Update product 
// @access      Public
router.put('/:id', (req, res) => {
  res.send('Update product')
})

// @route       DELETE api/products/:id
// @desc        Delete product 
// @access      Public
router.delete('/:id', (req, res) => {
  res.send('Delete product')
})

module.exports = router