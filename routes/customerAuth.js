const express = require('express')
const router = express.Router()

// @route       GET api/account
// @desc        Get logged in customer
// @access      Privat
router.get('/', (req, res) => {
  res.send('Get logged in customer')
})

// @route       POST api/account
// @desc        Auth customer and get token
// @access      Privat
router.post('/', (req, res) => {
  res.send('Log in customer')
})

module.exports = router