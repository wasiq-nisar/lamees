const Order = require('../models/OrderModel')
const Product = require('../models/ProductModel')

const getAllOrders = async(req, res) => {
  try {
    const orders = await Order.find({})
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

const getOrderById = async(req, res) => {
  const {id: orderId} = req.params
  try {
    const order = await Order.findOne({ _id: orderId})
    if (!order) {
      return res.status(404).json({msg: `No orders with ID: ${orderId}`})
    }

    return res.status(200).json({success:true, msg:order});
  } catch (error) {
    res.status(400).json({msg: error.message});
  }
}