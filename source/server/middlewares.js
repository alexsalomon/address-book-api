const path = require('path')
const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const logger = require('../services/logger')
const config = require('../config')

module.exports = app => {
  // Set static files to the 'docs' folder in order to render API documentation
  app.use(express.static(path.join(__dirname, '../../docs')))

  // Performance tweak
  app.use(compression())

  // Added security
  app.use(helmet())

  // Enable CORS
  app.use(cors())

  // Parse JSON and urlenconded responses
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // Logging HTTP request/response messages
  if (config.env === 'dev') {
    app.use(morgan('dev'))
  } else if (config.env === 'prod' || config.env === 'stag') {
    app.use(morgan('combined', {
      skip(req, res) {
        return res.statusCode < 500
      },
      stream: {
        write: message => { logger.error(message.trim()) },
      },
    }))
  }
}
