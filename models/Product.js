const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    featuredImgs: {
      type: String,
      required: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    options: [
      {
        color: { type: String },
        size: { type: String },
        others: [{ name: { type: String } }],
      },
    ],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category' }],
    reviews: [
      {
        customer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'customer',
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('product', ProductSchema)
