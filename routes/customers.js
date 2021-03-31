const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')
const config = require('config')
const { body, validationResult } = require('express-validator');

const Customer = require('../models/Customer')

// @route       GET api/customers
// @desc        Get all customers
// @access      Public
router.get('/', (req, res) => {
  res.send('Get all customers')
})

// @route       POST api/customers
// @desc        Create customers 
// @access      Public
router.post('/', [
  body('firstName', 'First Name is required').not().isEmpty(),
  body('lastName', 'Last Name is required').not().isEmpty(),
  body('email', 'Please include valid email').isEmail(),
  body('phoneNumber', 'Phone number is required').not().isEmpty(),
  body('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], 
async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const {firstName, lastName, email, phoneNumber, password} = req.body

  try {
    let customer = await Customer.findOne({email}) // Check if customer exists
    if (customer) {
      return res.status(400).json({msg: 'Customer allready exists'})
    }

    customer = new Customer({firstName, lastName, email, phoneNumber, password})
    const salt = await bcrypt.genSalt(10)
    customer.password = await bcrypt.hash(password, salt) // Hash version of password
    await customer.save()
    
    const payload = {
      customer: {
        id: customer.id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 7200
    }, (err, token) => {
      if (err) throw err
      res.json({token})
    })

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
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