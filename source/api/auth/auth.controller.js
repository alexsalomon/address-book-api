const HttpStatus = require('http-status')
const APIError = require('../../services/errors/apiError')
const User = require('../user/user')
const services = require('./auth.services')

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
  if (typeof email === 'undefined') {
    throw new APIError(HttpStatus.BAD_REQUEST, 'Email is required.')
  } else if (typeof password === 'undefined') {
    throw new APIError(HttpStatus.BAD_REQUEST, 'Password is required.')
  }

  const user = await User.findOne({ email })
  if (!user) {
    throw new APIError(HttpStatus.NOT_FOUND, 'User not found.')
  }

  const isPasswordValid = await user.isPasswordValid(password)
  if (!isPasswordValid) {
    throw new APIError(HttpStatus.UNAUTHORIZED, 'Invalid email and password combination.')
  }

  const token = await services.createToken(user._id)
  return { token }
}

module.exports = { register, login }
