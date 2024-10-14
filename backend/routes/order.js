const express = require('express')
const { addOrder, getAllOrders } = require('../controllers/order')
const router = express.Router()

router.route('/').post(addOrder).get(getAllOrders)

module.exports = router