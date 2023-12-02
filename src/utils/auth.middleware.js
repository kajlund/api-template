import jwt from 'jsonwebtoken'

import { AppError } from './errors.js'
import { statusCodes, reasonPhrases } from './status.js'
import userRepo from '../api/v1/users/user.repository.js'

const unauthorizedError = new AppError(statusCodes.UNAUTHORIZED, reasonPhrases.UNAUTHORIZED, 'Authentication failed')

export const isAuthenticated = async (req, res, next) => {
  const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : req.cookies.token
  if (!token) return next(unauthorizedError)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await userRepo.findUserById(decoded.id)
    next()
  } catch (err) {
    return next(unauthorizedError)
  }
}

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    return next()
  }
  next(unauthorizedError)
}
