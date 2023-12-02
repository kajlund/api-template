import Joi from 'joi'

import { AppError } from '../../../utils/errors.js'
import { statusCodes, reasonPhrases } from '../../../utils/status.js'

export const validateLogin = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(8).max(100).trim().required(),
  })
  const { error, value } = Joi.compile(schema).validate(req.body)
  if (error) {
    const errorDetail = error.details.map((details) => details.message).join(', ')
    const err = new AppError(statusCodes.UNPROCESSABLE_ENTITY, reasonPhrases.UNPROCESSABLE_ENTITY, errorDetail)
    return next(err)
  }
  res.locals.data = value
  return next()
}

export const validateNewUser = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().trim().required(),
    alias: Joi.string().min(2).max(25).required().trim(),
    password: Joi.string().min(8).max(100).trim().required(),
  })
  const { error, value } = Joi.compile(schema).validate(req.body)
  if (error) {
    const errorDetail = error.details.map((details) => details.message).join(', ')
    const err = new AppError(statusCodes.UNPROCESSABLE_ENTITY, reasonPhrases.UNPROCESSABLE_ENTITY, errorDetail)
    return next(err)
  }
  res.locals.data = value
  return next()
}
