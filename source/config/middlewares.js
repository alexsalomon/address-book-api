'use strict'

const bodyParser = require('body-parser')
const morgan = require('morgan')
const config = require('./settings')

module.exports = app => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  if (config.env.isDev && !config.env.isTest) {
    app.use(morgan('dev'))
  }
}
