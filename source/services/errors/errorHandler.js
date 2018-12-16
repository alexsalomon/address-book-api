const HttpStatus = require('http-status')
const logger = require('../logger')

class ErrorHandler {
  handleError(err, req, res, next) {
    this.handleOperationalError(err, req, res, next)
    this.handleProgrammerError(err)
  }

  handleOperationalError(err, req, res, next) {
    if (err.isOperational) {
      logger.warn(err)
      if (typeof res !== 'undefined') {
        const errorStatus = err.status || HttpStatus.INTERNAL_SERVER_ERROR
        const errorMessage = err.message || 'Internal Server Error'
        res.status(errorStatus).json({ message: errorMessage })
      }
    }
  }

  handleProgrammerError(err) {
    if (!err.isOperational) {
      logger.debug('Reached programmer error handler.')
      logger.error(err)
      // Programmer errors leave the application in an unknown state
      process.exit(1) /* eslint-disable-line no-process-exit */
    }
  }
}

module.exports = new ErrorHandler()
