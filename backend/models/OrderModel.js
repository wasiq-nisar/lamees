const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  items: [
    {
      prodcutId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      qty: {
        type: Number,
        required: true,
        validate: {
          validator: function(value) {
            return value >= 0
          },
          message: "Total qty must be greater than 0.",
        }
      }, 
      price: {
        type: Number,
        required: true,
        validate: {
          validator: function(value) {
            return value >= 0
          },
          message: "Total price must be greater than 0."
        }
      },
      totalPrice:{
        type:Number,
        required:true,
        validate: {
          validator: function (value) {
            return value >= 0;
          },
          message: "Total price must be greater than 0.",
        }
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
    }
  ]
})

module.exports = mongoose.model('Order', orderSchema)