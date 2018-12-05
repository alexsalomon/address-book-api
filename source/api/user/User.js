'use strict'

const HttpStatus = require('http-status')
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const APIError = require('../../services/errors')
const config = require('../../config/config')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required.'],
    trim: true,
    validate: { validator: validator.isEmail, message: 'Email is invalid.' },
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [
      config.auth.passwordMinLength,
      `Minimum password length is ${config.auth.passwordMinLength}`,
    ],
    validate: {
      validator(password) {
        return password.length >= config.auth.passwordMinLength
      },
      message: 'Password is required.',
    },
  },
}, { timestamps: true })

UserSchema.pre('save', async function hashPassword(done) {
  if (this.isModified('password')) {
    const hashedPassword = await bcrypt.hash(this.password, config.auth.saltRounds)
    this.password = hashedPassword
  }
  return done()
})

UserSchema.post('save', (err, doc, next) => {
  if (err.name === 'MongoError' && err.code === 11000) {
    return next(new APIError(HttpStatus.BAD_REQUEST, 'User already exists.'))
  } else if (err.name === 'ValidationError') {
    return next(new APIError(HttpStatus.BAD_REQUEST, err.message))
  }
  return next(err)
})

UserSchema.methods = {
  async isPasswordValid(rawPassword) {
    const isValid = await bcrypt.compare(rawPassword, this.password)
    return isValid
  },
}

mongoose.model('User', UserSchema)

module.exports = mongoose.model('User')
