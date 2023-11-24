import express from 'express'

import { statusCodes } from '../../../utils/status.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    res.status(statusCodes.OK).json([])
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    res.status(statusCodes.OK).json({ id })
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

router.patch('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    res.status(statusCodes.OK).json({ id, data: req.body })
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    res.status(statusCodes.OK).json({ id })
  } catch (err) {
    next(err)
  }
})

export default router
