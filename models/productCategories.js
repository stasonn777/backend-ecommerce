const mongoose = require('mongoose')

const ProductCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    parent: {
      type: String,
    },
    products: {
      type: Array,
      list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('product_category', ProductCategorySchema)
