const express = require('express')
const { createPaymentIntent } = require('../controllers/stripe')
const router = express.Router()

router.route('/').post(createPaymentIntent)

module.exports = router