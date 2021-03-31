const express = require('express')
const router = express.Router()
const customerauth = require('../middleware/customerauth')
const { body, validationResult } = require('express-validator')

const Customer = require('../models/Customer')
const Order = require('../models/Order')

// @route       GET api/orders
// @desc        Get all orders
// @access      Privat
router.get('/', customerauth, async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.customer.id }).sort({
      date: -1,
    })
    res.json(orders)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route       POST api/orders
// @desc        Create orders
// @access      Privat
router.post(
  '/',
  [
    customerauth,
    [
      body('delivery', 'Delivery is required').not().isEmpty(),
      body('payment', 'Payment is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req, res)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { delivery, payment, status, active, products, modifiedOn } = req.body
    try {
      const newOrder = new Order({
        delivery,
        payment,
        status,
        active,
        products,
        modifiedOn,
        customer: req.customer.id
      })

      const order = await newOrder.save()

      res.json(order)
    } catch (err) {
      console.error(err,message)
      res.status(500).send('Server Error')
    }
  }
)

// @route       PUT api/orders/:id
// @desc        Update order
// @access      Privat
router.put('/:id', (req, res) => {
  res.send('Update order')
})

// @route       DELETE api/orders/:id
// @desc        Delete order
// @access      Privat
router.delete('/:id', (req, res) => {
  res.send('Delete order')
})

module.exports = router
