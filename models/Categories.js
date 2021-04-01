const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    parent: [this]
  },
  { timestamps: true }
)

module.exports = mongoose.model('category', CategorySchema)