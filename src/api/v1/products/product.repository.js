import dao from '../../../utils/dao.knex.js'

const tableName = 'Products'

const mapToProductEntity = (p) => {
  return p
}

export default {
  findItems: async function (query) {
    const rows = await dao.findMany(tableName, query)
    return rows.map((row) => mapToProductEntity(row))
  },

  findProductById: async function (id) {
    const row = dao.findOne(tableName, { id })
    if (row) return mapToProductEntity(row)
    return null
  },

  insertProduct: async function (data) {
    const row = await dao.createOne(tableName, data)
    if (row) return mapToProductEntity(row)
    return null
  },

  updateProduct: async function (id, data) {
    const row = await dao.updateOne(tableName, id, data)
    if (row) return mapToProductEntity(row)
    return null
  },

  deleteProduct: function (id) {
    return dao.deleteOne(tableName, id)
  },
}
