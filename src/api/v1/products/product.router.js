import express from 'express'

import { validateIdParam } from '../../../utils/common.validators.middleware.js'
import { validateInsert, validateUpdate } from './product.validators.js'
import productService from './product.service.js'
import { statusCodes } from '../../../utils/status.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const products = await productService.getProductList()
    res.status(statusCodes.OK).json({ sucess: true, message: `Found ${products.length} products`, data: products })
  } catch (err) {
    next(err)
  }
})

router.get('/:id', validateIdParam, async (req, res, next) => {
  try {
    const product = await productService.findProductById(res.locals.id)
    res.status(statusCodes.OK).json({ success: true, message: `Found product: ${product.name}`, data: product })
  } catch (err) {
    next(err)
  }
})

router.post('/', validateInsert, async (req, res, next) => {
  try {
    const product = await productService.createProduct(res.locals.data)
    res.status(statusCodes.OK).json({
      success: true,
      message: `Created product: ${product.name}`,
      data: product,
    })
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', validateIdParam, validateUpdate, async (req, res, next) => {
  try {
    const product = await productService.updateProduct(res.locals.id, res.locals.data)
    res.status(statusCodes.OK).json({ success: true, message: `Updated product: ${product.name}`, data: product })
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', validateIdParam, async (req, res, next) => {
  try {
    const deleted = await productService.deleteProduct(res.locals.id)
    res.status(statusCodes.OK).json({ success: true, message: `Deleted product: ${deleted.name}`, data: deleted })
  } catch (err) {
    next(err)
  }
})

export default router
