const HttpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const APIError = require('../../services/errors/api.error')
const config = require('../../config')

/**
 * Authentication token verification middleware.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {function} next The next middleware to be executed.
 * @returns {function} The next middleware to be executed.
 */
async function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const { userId } = await jwt.verify(token, config.auth.secret)
    req.userId = userId
    return next()
  } catch (error) {
    return next(new APIError({ status: HttpStatus.UNAUTHORIZED, message: error.message }))
  }
}

/**
 * Creates an authentication token.
 * @param {string} userId The user's id
 * @returns {string} The authentication token
 */
async function createToken(userId) {
  const token = await jwt.sign({ userId }, config.auth.secret, {
    expiresIn: config.auth.jwtExpiresIn,
  })
  return token
}

module.exports = { authenticate, createToken }
