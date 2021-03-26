const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');

const User = require('../models/User')

// @route       GET api/users
// @desc        Get all users
// @access      Public
router.get('/', (req, res) => {
  res.send('Get all users')
})

// @route       POST api/users
// @desc        Create users 
// @access      Public
router.post('/', [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please include valid email').isEmail(),
  body('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], 
async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const {name, email, password, role} = req.body

  try {
    let user = await User.findOne({email}) // Check if user exists
    if (user) {
      return res.status(400).json({msg: 'User allready exists'})
    }

    user = new User({name, email, password, role})
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt) // Hash version of password
    await user.save()
    res.send('User saved')

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }

  res.send('passed')
})

// @route       PUT api/users/:id
// @desc        Update user 
// @access      Public
router.put('/:id', (req, res) => {
  res.send('Update user')
})

// @route       DELETE api/users/:id
// @desc        Delete user 
// @access      Public
router.delete('/:id', (req, res) => {
  res.send('Delete user')
})

module.exports = router