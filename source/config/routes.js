'use strict'

const HttpStatus = require('http-status')
const express = require('express')
const APIError = require('../util/errors')
const AuthRoutes = require('../api/auth/AuthRoutes')
const ContactRoutes = require('../api/addressBook/ContactRoutes')
const logger = require('../util/logger')

const router = new express.Router()

// API Custom routes
router.use('/', AuthRoutes)
router.use('/contacts', ContactRoutes)

// Handles all other routes with a 404 NotFoundError
router.all('*', (req, res, next) => next(new APIError(HttpStatus.NOT_FOUND, 'Resource not found.')))

// Returns json response for APIErrors and logs unexpected errors
// returning a generic internal server error message otherwise
router.use(function handleErrors(err, req, res, next) {
  if (err instanceof APIError) {
    return res.status(err.status).json({ message: err.message })
  }

  logger.error(err)
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
  return next(err)
})

module.exports = router
