const HttpStatus = require('http-status')
const express = require('express')
const APIError = require('../services/errors/api.error')
const AuthRoutes = require('../api/auth/auth.routes')
const ContactRoutes = require('../api/addressBook/contact.routes')

const router = new express.Router()

// Render API documentation
router.get('/', (req, res) => {
  res.sendFile('index.html')
})

// API Custom routes
router.use('/', AuthRoutes)
router.use('/contacts', ContactRoutes)

// Handles all subsequent routes with a 404 NotFoundError
router.all('*', (req, res, next) => next(new APIError({
  status: HttpStatus.NOT_FOUND,
  message: 'Resource not found.',
})))

module.exports = router
