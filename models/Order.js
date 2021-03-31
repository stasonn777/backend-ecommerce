const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customer',
    },
    delivery: {
      type: Object,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        'Pending',
        'Awaiting Payment',
        'Awaiting Shipment',
        'Shipped',
        'Cancelled',
        'Refunded',
      ],
      default: 'Pending',
    },
    active: {
      type: Boolean,
      default: true,
    },
    products: [
      {
        // productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
        productId: { type: String },
        quantity: { type: Number },
        name: { type: String },
        price: { type: Number },
      }
    ],
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

OrderSchema.pre('save', function (next) {
  this.tags = _.uniq(this.tags);
  next();
});

module.exports = mongoose.model('order', OrderSchema)
