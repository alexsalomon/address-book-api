'use strict'

const path = require('path')
const convict = require('convict')
const dotenv = require('dotenv')

// Load variables from .env
dotenv.config()

const config = convict({
  env: {
    format: ['dev', 'test', 'prod', 'stag'],
    default: 'dev',
    arg: 'env',
    env: 'NODE_ENV',
  },
  app: {
    port: {
      format: 'port',
      default: 8080,
      arg: 'port',
      env: 'PORT',
    },
  },
  db: {
    mongo: {
      url: {
        format: String,
        default: 'mongodb://localhost:27017/restful-api-dev',
        arg: 'mongoDbUri',
        env: 'MONGODB_URI',
      },
      debug: {
        format: Boolean,
        default: true,
        arg: 'dbDebug',
        env: 'DB_DEBUG',
      },
    },
    firebase: {
      url: {
        format: 'url',
        default: 'https://address-book-api.firebaseio.com',
        arg: 'firebaseUrl',
        env: 'FIREBASE_URL',
      },
      privateKey: {
        format: String,
        default: '',
        env: 'FIREBASE_PRIVATE_KEY',
        sensitive: true,
      },
      clientEmail: {
        format: String,
        default: '',
        env: 'FIREBASE_CLIENT_EMAIL',
        sensitive: true,
      },
    },
  },
  auth: {
    secret: {
      format: String,
      default: 'supersecret',
      env: 'JWT_SECRET',
      sensitive: true,
    },
    saltRounds: {
      format: 'nat',
      default: 10,
      env: 'JWT_SALT_ROUNDS',
    },
    jwtExpiresIn: {
      format: 'nat',
      default: 3600,
      args: 'jwtExpiresIn',
      env: 'JWT_EXPIRES_IN',
    },
    passwordMinLength: {
      format: 'nat',
      default: 8,
      env: 'PASSWORD_MIN_LENGTH',
    },
  },
  logger: {
    logsPath: {
      format: String,
      default: path.join(__dirname, '../../logs/'),
      args: 'logs',
      env: 'LOGS_PATH',
    },
    sentry: {
      dns: {
        format: String,
        default: '',
        env: 'SENTRY_DNS',
        sensitive: true,

      },
      level: {
        format: String,
        default: 'error',
        args: 'sentryLevel',
        env: 'SENTRY_LEVEL',
      },
    },
  },
})

const env = config.get('env')
config.loadFile(path.join(__dirname, `./${env}.json`))

// Replace literal '\n' found in Firebase's private key with the newline character
const firebaseKey = config.get('db.firebase.privateKey')
if (firebaseKey) {
  config.set('db.firebase.privateKey', firebaseKey.replace(/\\n/gu, '\n'))
}

// Throws an error if config does not conform to schema
config.validate({ allowed: 'strict' })

// Abstract away convict and export settings as an object
const settings = config.getProperties()

module.exports = settings
