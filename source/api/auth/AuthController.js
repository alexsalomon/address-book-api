'use strict'

const ApiError = require('http-errors')
const User = require('../user/User')
const services = require('./AuthServices')

/**
 * Register a user.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {Object} The response object containing the jwt token.
 */
async function register(email, password) {
  const user = await User.create({ email, password })
  const token = await services.createToken(user._id)
  return { token }
}

/**
 * Logs a user in.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {Object} The response object containing the jwt token.
 */
async function login(email, password) {
  const user = await User.findOne({ email })
  if (!user) {
    throw new ApiError.NotFound('User not found.')
  } else if (!user.isPasswordValid(password)) {
    throw new ApiError.Unauthorized('Invalid email and password combination.')
  }

  const token = await services.createToken(user._id)
  return { token }
}

module.exports = { register, login }
