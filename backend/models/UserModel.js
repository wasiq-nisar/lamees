const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// Static SignUp Method
userSchema.statics.signup = async function(name, email, password) {
  if (!email || !password || !name) {
    throw Error('All Fields must be filled')
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not Valid');
  }

  const exists = await this.findOne({ email })
  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ name, email, password: hash})
  return user
}

// Static Login Method
userSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw Error('All Fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error(`User with Email: ${email} does not exists`)
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    console.log('Incorrect Password')
    throw Error('Incorrect Password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)