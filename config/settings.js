'use strict'

const dotenv = require('dotenv')

// Load variables from .env
dotenv.config()

const defaultEnv = 'production'
const envSettings = {
  current: process.env.NODE_ENV || defaultEnv,
  prod: 'production',
  dev: 'development',
  test: 'test',
}

const settings = {
  env: {
    current: envSettings.current,
    prod: envSettings.prod,
    dev: envSettings.dev,
    test: envSettings.test,
    isProd: envSettings.current === envSettings.prod,
    isDev: envSettings.current === envSettings.dev,
    isTest: envSettings.current === envSettings.test,
  },
  app: {
    port: parseInt(process.env.PORT) || 8080,
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 27017,
    name: process.env.DB_NAME || 'restful-api-prod',
    debug: process.env.DB_DEBUG || 'false',
  },
}

const devSettings = JSON.parse(JSON.stringify(settings))
devSettings.db.name = process.env.DB_NAME || 'restful-api-dev'
devSettings.db.debug = process.env.DB_DEBUG || 'true'

const testSettings = JSON.parse(JSON.stringify(settings))
testSettings.db.name = process.env.DB_NAME || 'restful-api-test'
testSettings.db.debug = process.env.DB_DEBUG || 'true'

let config = {}
switch (settings.env.current) {
  case settings.env.dev:
    config = devSettings
    break
  case settings.env.test:
    config = testSettings
    break
  case settings.env.prod:
  default:
    config = settings
    break
}

module.exports = config
