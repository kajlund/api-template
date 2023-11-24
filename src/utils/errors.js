import { reasonPhrases, statusCodes } from './status.js'

export class AppError extends Error {
  constructor(
    statusCode = statusCodes.INTERNAL_SERVER_ERROR,
    message = reasonPhrases.INTERNAL_SERVER_ERROR,
    detail = '',
    stack = '',
  ) {
    super(message)
    this.name = this.constructor.name
    this.isAppError = true
    this.statusCode = statusCode
    this.detail = detail
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
