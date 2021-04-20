const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    featuredImg: {
      type: String,
      required: false,
    },
    images: [
      {
        url: {
          type: String,
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
    },
    price: {
      type: Number,
      required: true,
    },
    newPrice: {
      type: Number,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    options: [{ id: {type: String}, name: { type: String }, value: { type: String}, type: {type: String}}],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category' }],
    reviews: [
      {
        customer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'customer',
        },
        revName: {
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    status: {
      type: String,
      enum: ['saved', 'published', 'draft'],
      default: 'saved',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('product', ProductSchema)
