const express = require('express')
const router = express.Router()

// @route       GET api/customers
// @desc        Get all customers
// @access      Public
router.get('/', (req, res) => {
  res.send('Get all customers')
})

// @route       POST api/customers
// @desc        Create customers 
// @access      Public
router.post('/', (req, res) => {
  res.send('Create new customer')
})

// @route       PUT api/customers/:id
// @desc        Update customer 
// @access      Public
router.put('/:id', (req, res) => {
  res.send('Update customer')
})

// @route       DELETE api/customers/:id
// @desc        Delete customer 
// @access      Public
router.delete('/:id', (req, res) => {
  res.send('Delete customer')
})

module.exports = router