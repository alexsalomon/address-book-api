
const fse = require('fs-extra')
const winston = require('winston')
const Sentry = require('winston-sentry-raven-transport')
const config = require('../config')

const errorLogFile = `${config.logger.logsPath}error.log`
const combinedLogFile = `${config.logger.logsPath}combined.log`

async function initialize() {
  await createLogFiles()
  const loggerOptions = getLoggerOptions(config.env)
  return winston.createLogger(loggerOptions)
}

async function createLogFiles() {
  try {
    await fse.ensureFile(errorLogFile)
    await fse.ensureFile(combinedLogFile)
  } catch (err) {
    throw err
  }
}

function getLoggerOptions(env) {
  let loggerOptions = {}

  switch (env) {
    case 'dev':
    case 'test':
      loggerOptions = {
        transports: [
          new winston.transports.Console({
            format: winston.format.simple(),
            level: 'debug',
            handleExceptions: true,
            colorize: true,
            timestamp: true,
          }),
        ],
      }
      break
    case 'prod':
    default:
      loggerOptions = {
        transports: [
          new winston.transports.File({
            format: winston.format.json(),
            filename: errorLogFile,
            level: 'error',
            handleExceptions: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: false,
            timestamp: true,
          }),
          new winston.transports.File({
            format: winston.format.json(),
            level: 'info',
            filename: combinedLogFile,
            handleExceptions: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: false,
            timestamp: true,
          }),
          new Sentry({
            dsn: config.logger.sentry.dns,
            level: config.logger.sentry.level,
            install: true,
            config: {
              captureUnhandledRejections: true,
            },
          }),
        ],
      }
      break
  }

  return loggerOptions
}


module.exports = initialize()
