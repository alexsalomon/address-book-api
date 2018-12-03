'use strict'

const HttpStatus = require('http-status')
const ApiError = require('http-errors')
const express = require('express')
const AuthRoutes = require('../api/auth/AuthRoutes')
const ContactRoutes = require('../api/addressBook/ContactRoutes')
const logger = require('../util/logger')

const router = new express.Router()

router.use('/', AuthRoutes)
router.use('/contacts', ContactRoutes)

router.all('*', (req, res, next) => {
  next(new ApiError.NotFound('Resource not found.'))
})

router.use(function logErrors(err, req, res, next) {
  logger.error(err)
  next(err)
})

router.use(function handleErrors(err, req, res, next) {
  res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
    type: err.type || err.name,
    message: err.message || HttpStatus['500_NAME'],
  })

  next(err)
})

module.exports = router
