const express = require('express')
const router = express.Router()
const { getAllProducts, addProduct, deleteProduct, updateProduct } = require('../controllers/product')

router.route('/').get(getAllProducts).post(addProduct)
router.route('/:id').delete(deleteProduct).patch(updateProduct)

module.exports = router