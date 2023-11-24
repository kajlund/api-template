import express from 'express'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    res.status(200).json([])
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    res.status(200).json({ id })
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    res.status(200).json(req.body)
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    res.status(200).json({ id, data: req.body })
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    res.status(200).json({ id })
  } catch (err) {
    next(err)
  }
})

export default router
