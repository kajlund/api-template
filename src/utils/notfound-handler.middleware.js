import { AppError } from '../utils/errors.js'
import { statusCodes } from './status.js'

export default (req, res, next) => {
  const error = new AppError(statusCodes.NOT_FOUND, `Route ${req.originalUrl} was not found`)

  next(error)
}
