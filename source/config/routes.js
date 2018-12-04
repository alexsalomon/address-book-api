'use strict'

const HttpStatus = require('http-status')
const ApiError = require('http-errors')
const express = require('express')
const AuthRoutes = require('../api/auth/AuthRoutes')
const ContactRoutes = require('../api/addressBook/ContactRoutes')
const logger = require('../util/logger')

const router = new express.Router()

// API Custom routes
router.use('/', AuthRoutes)
router.use('/contacts', ContactRoutes)

// Handles all other routes with a 404 NotFoundError
router.all('*', (req, res, next) => next(new ApiError.NotFound('Resource not found.')))

// Logs any errors that made it this far
router.use(function logErrors(err, req, res, next) {
  logger.error(err)
  return next(err)
})

// Handles errors by sending a json response with the error type and message
router.use(function handleErrors(err, req, res, next) {
  res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
    type: err.type || err.name,
    message: err.message || HttpStatus['500_NAME'],
  })

  return next(err)
})

module.exports = router
