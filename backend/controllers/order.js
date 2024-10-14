const Order = require('../models/OrderModel')
const Product = require('../models/ProductModel')

const addOrder = async(req, res) => {
  const { items, totalPrice, userInfo, shippingAddress, paymentMethod } = req.body
  try {
    for (let item of items) {
      const product = await Product.findById(item._id)

      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found` })
      } 
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for product ${product.title}` });
      }
    }

    const newOrder = new Order({ items, totalPrice, userInfo, shippingAddress, paymentMethod })
    await newOrder.save()

    for (let item of items) {
      await Product.findByIdAndUpdate(item._id, {
        $inc: {stock: -item.quantity}
      })
    }

    res.status(201).json(newOrder)
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
}

const getAllOrders = async(req, res) => {
  try {
    const orders = await Order.find({})
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error })
  }
}

const orderById = async(req, res) => {
  try {
    const {id: orderId} = req.params
    const order = await Order.findOne({ _id: orderId})

    if (!order) { 
      return res.status(404).json({ message: 'Order not found' })
    }

    res.status(200).json(order)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error })
  }
}

const updateOrder = async(req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(req.params.id, req.body, {new: true})
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.status(200).json(updatedOrder)
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error })
  }
}

const deleteOrder = async(req, res) => {
  const {id: orderId} = req.params
  try {
    const deleteOrder = await Order.findByIdAndDelete({ _id: orderId})
    if (!deleteOrder) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.status(200).json({ message: 'Order deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error })
  }
}

module.exports = {addOrder, deleteOrder, getAllOrders, updateOrder, orderById}