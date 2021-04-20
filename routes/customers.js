const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const customerauth = require('../middleware/customerauth')
const userauth = require('../middleware/userauth')
const { body, validationResult } = require('express-validator')

const Customer = require('../models/Customer')
const User = require('../models/User')

// @route       GET api/customers
// @desc        Get all customers
// @access      Public
router.get('/', userauth, async (req, res) => {
  try {
    const customers = await Customer.find()
    res.json(customers)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route       POST api/customers
// @desc        Create customers
// @access      Public
router.post(
  '/',
  [
    body('firstName', 'First Name is required').not().isEmpty(),
    body('lastName', 'Last Name is required').not().isEmpty(),
    body('email', 'Please include valid email').isEmail(),
    body('phoneNumber', 'Phone number is required').not().isEmpty(),
    body(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { firstName, lastName, email, phoneNumber, password } = req.body

    try {
      let customer = await Customer.findOne({ email }) // Check if customer exists
      if (customer) {
        return res.status(400).json({ msg: 'Customer allready exists' })
      }

      customer = new Customer({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      })
      const salt = await bcrypt.genSalt(10)
      customer.password = await bcrypt.hash(password, salt) // Hash version of password
      await customer.save()

      const payload = {
        customer: {
          id: customer.id,
        },
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 7200,
        },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

// @route       PUT api/customers/:id
// @desc        Update customer
// @access      Privat
router.put('/:id', customerauth, async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body

  const customerFields = {}

  if (firstName) customerFields.firstName = firstName
  if (lastName) customerFields.lastName = lastName
  if (email) customerFields.email = email
  if (phoneNumber) customerFields.phoneNumber = phoneNumber
  if (password) customerFields.password = password

  try {
    let customer = await Customer.findById(req.params.id)

    if (!customer) return res.status(404).json({ msg: 'Customer not found' })

    // Make sure customer owns data
    if (customer.id.toString() !== req.customer.id) {
      return res.status(401).json({ msg: 'Customer not authorized' })
    }

    customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: customerFields },
      { new: true }
    )

    res.json(customer)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route       DELETE api/customers/:id
// @desc        Delete customer
// @access      Public
router.delete('/:id', (req, res) => {
  res.send('Delete customer')
})

module.exports = router
