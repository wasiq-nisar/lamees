const express = require('express')
const { loginUser, registerUser } = require('../controllers/user')
const router = express.Router()

router.route('/login').post(loginUser)
router.route('/signup').post(registerUser)

module.exports = router