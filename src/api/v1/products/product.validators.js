import Joi from 'joi'

import { AppError } from '../../../utils/errors.js'
import { statusCodes, reasonPhrases } from '../../../utils/status.js'

export const validateInsert = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(2).max(200).trim().required(),
    description: Joi.string().max(1000).optional().allow(''),
    price: Joi.number().precision(2).greater(0).max(1000000).required(),
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

export const validateUpdate = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(2).max(200).trim().optional().allow(null).allow(''),
    description: Joi.string().max(1000).optional().allow(null).allow(''),
    price: Joi.number().precision(2).greater(0).max(1000000).optional().allow(null).allow(''),
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
