const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const customerauth = require('../middleware/customerauth')
const { body, validationResult } = require('express-validator')

const Customer = require('../models/Customer')

// @route       GET api/account
// @desc        Get logged in customer
// @access      Privat
router.get('/', customerauth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.customer.id).select('-password')
    res.json(customer)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route       POST api/account
// @desc        Auth customer and get token
// @access      Public
router.post(
  '/',
  [
    body('email', 'Please include valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
      let customer = await Customer.findOne({email}) // Check if customer exists
      if (!customer) {
        return res.status(400).json({ msg: 'Invalid credentials' })
      }
      const isMatch = await bcrypt.compare(password, customer.password)
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' })
      }
      const payload = {
        customer: {
          id: customer.id
        }
      }
  
      jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: '365d'
      }, (err, token) => {
        if (err) throw err
        res.json({token})
      })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
)

module.exports = router