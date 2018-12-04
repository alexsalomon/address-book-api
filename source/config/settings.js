'use strict'

const path = require('path')
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
    mongo: {
      url: process.env.MONGODB_URI || 'mongodb://localhost:27017/restful-api',
      debug: process.env.DB_DEBUG || 'false',
    },
    firebase: {
      url: 'https://address-book-api.firebaseio.com',
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    },
  },
  auth: {
    secret: process.env.JWT_SECRET || 'supersecret',
    saltRounds: parseInt(process.env.JWT_SALT_ROUNDS) || 10,
    jwtExpiresIn: parseInt(process.env.JWT_EXPIRES_IN) || 3600,
    passwordMinLength: parseInt(process.env.PASSWORD_MIN_LENGTH) || 8,
  },
  logger: {
    logsPath: path.join(__dirname, '../../logs/'),
    sentry: {
      dns: process.env.SENTRY_DNS,
      level: process.env.SENTRY_LEVEL || 'error',
    },
  },
}

// Replace literal '\n' found in Firebase's private key with the newline character
if (settings.db.firebase.privateKey) {
  settings.db.firebase.privateKey = settings.db.firebase.privateKey.replace(/\\n/gu, '\n')
}

const devSettings = JSON.parse(JSON.stringify(settings))
devSettings.db.mongo.url = process.env.MONGODB_URI || 'mongodb://localhost:27017/restful-api-dev'
devSettings.db.mongo.debug = process.env.DB_DEBUG || 'true'
devSettings.logger.sentry = {}

const testSettings = JSON.parse(JSON.stringify(settings))
testSettings.db.mongo.url = process.env.MONGODB_URI || 'mongodb://localhost:27017/restful-api-test'
testSettings.db.mongo.debug = process.env.DB_DEBUG || 'true'
devSettings.logger.sentry = {}

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
