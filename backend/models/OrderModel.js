const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  items: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      title: String,
      quantity: { type: Number, required: true },
      price: { type: Number, required: true}
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  userInfo: {
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    fullName: { type: String, required: true },
  },
  shippingAddress: {
    street: { type: String, required: true},
    city: { type: String, required: true},
    postalCode: String,
    country: { type: String, required: true},
  },
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Canceled'],
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Card'],
    default: 'Cash'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('Order', orderSchema)