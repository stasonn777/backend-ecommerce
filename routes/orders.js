const express = require('express')
const router = express.Router()

// @route       GET api/orders
// @desc        Get all orders
// @access      Public
router.get('/', (req, res) => {
  res.send('Get all orders')
})

// @route       POST api/orders
// @desc        Create orders 
// @access      Public
router.post('/', (req, res) => {
  res.send('Create new order')
})

// @route       PUT api/orders/:id
// @desc        Update order 
// @access      Public
router.put('/:id', (req, res) => {
  res.send('Update order')
})

// @route       DELETE api/orders/:id
// @desc        Delete order 
// @access      Public
router.delete('/:id', (req, res) => {
  res.send('Delete order')
})

module.exports = router