const express = require('express')
const router = express.Router()

// @route       GET api/users
// @desc        Get all users
// @access      Public
router.get('/', (req, res) => {
  res.send('Get all users')
})

// @route       POST api/users
// @desc        Create users 
// @access      Public
router.post('/', (req, res) => {
  res.send('Create new user')
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