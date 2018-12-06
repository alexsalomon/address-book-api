const HttpStatus = require('http-status')

class APIError extends Error {
  constructor(status = HttpStatus.INTERNAL_SERVER_ERROR, message = HttpStatus['500_NAME']) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.status = status
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor.name)
  }
}

module.exports = APIError
