const express = require('express')
const { createPaymentIntent } = require('../controllers/stripeController')
const router = express.Router()

router.route('/').post(createPaymentIntent)

module.exports = router