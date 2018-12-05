'use strict'

const HttpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const APIError = require('../../services/errors')
const config = require('../../config')

/**
 * Authentication token verification middleware.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {function} next The next middleware to be executed.
 * @returns {function} The next middleware to be executed.
 */
async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if (typeof authHeader !== 'undefined') {
      const bearer = authHeader.split(' ')
      const token = bearer[1]
      const decoded = await jwt.verify(token, config.auth.secret)
      req.userId = decoded.id
    } else {
      throw new Error('No authorization token provided.')
    }
    return next()
  } catch (error) {
    return next(new APIError(HttpStatus.UNAUTHORIZED, error.message))
  }
}

/**
 * Creates an authentication token.
 * @param {string} userId The user's id
 * @returns {string} The authentication token
 */
async function createToken(userId) {
  const token = await jwt.sign({ id: userId }, config.auth.secret, {
    expiresIn: config.auth.jwtExpiresIn,
  })
  return token
}

module.exports = { verifyToken, createToken }
