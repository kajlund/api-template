import Joi from 'joi'

import { AppError } from './errors.js'
import { statusCodes, reasonPhrases } from './status.js'

export const validateIdParam = (req, res, next) => {
  const schema = Joi.object().keys({
    id: Joi.string()
      .required()
      .guid({
        version: ['uuidv4'],
      }),
  })

  const { error, value } = Joi.compile(schema).validate(req.params)
  if (error) {
    const errorDetail = error.details.map((details) => details.message).join(', ')
    const err = new AppError(statusCodes.UNPROCESSABLE_ENTITY, reasonPhrases.UNPROCESSABLE_ENTITY, errorDetail)
    return next(err)
  }
  res.locals.id = value.id
  return next()
}
