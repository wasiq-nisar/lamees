const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, {expiresIn: '3d'})
}

const loginUser = async(req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)
    // create a token
    const token = createToken(user._id)
    const name = user.name

    res.status(200).json({email, name, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const registerUser = async(req, res) => {
  const {name, email, password} = req.body

  try {
    const user = await User.signup(name, email, password)

    const token = createToken(user._id)

    res.status(200).json({name, email, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

module.exports = {
  loginUser,
  registerUser
}