import productRepo from './product.repository.js'
import { AppError } from '../../../utils/errors.js'
import { statusCodes, reasonPhrases } from '../../../utils/status.js'

const findProductById = async (id) => {
  const product = await productRepo.findProductById(id)
  if (!product) {
    throw new AppError(statusCodes.NOT_FOUND, reasonPhrases.NOT_FOUND, `A product with id ${id} was not found`)
  }
  return product
}

export default {
  getProductList: function (query) {
    return productRepo.findItems(query)
  },

  findProductById,

  createProduct: async function (data) {
    const product = await productRepo.insertProduct(data)
    return product
  },

  updateProduct: async function (id, data) {
    await findProductById(id)
    const product = await productRepo.updateProduct(id, data)
    return product
  },

  deleteProduct: async function (id) {
    const found = await findProductById(id)
    const success = productRepo.deleteProduct(id)
    if (!success) {
      throw new AppError(
        statusCodes.INTERNAL_SERVER_ERROR,
        reasonPhrases.INTERNAL_SERVER_ERROR,
        `Product with id ${id} was not deleted`,
      )
    }
    return found
  },
}
