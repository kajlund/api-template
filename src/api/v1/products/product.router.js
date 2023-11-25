import express from 'express'

import { validateIdParam } from '../../../utils/common.validators.middleware.js'
import { statusCodes } from '../../../utils/status.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    res.status(statusCodes.OK).json([])
  } catch (err) {
    next(err)
  }
})

router.get('/:id', validateIdParam, async (req, res, next) => {
  try {
    res.status(statusCodes.OK).json({ id: req.paramId })
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    res.status(statusCodes.OK).json(req.body)
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', validateIdParam, async (req, res, next) => {
  try {
    res.status(statusCodes.OK).json({ id: req.paramId, data: req.body })
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', validateIdParam, async (req, res, next) => {
  try {
    res.status(statusCodes.OK).json({ id: req.paramId })
  } catch (err) {
    next(err)
  }
})

export default router
