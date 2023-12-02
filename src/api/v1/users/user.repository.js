import bcrypt from 'bcryptjs'

import dao from '../../../utils/dao.knex.js'

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10)
const tableName = 'Users'

const mapToUserEntity = (u) => {
  return {
    id: u.id,
    email: u.email,
    alias: u.alias,
    role: u.role,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
  }
}

export default {
  findUserByEmail: async function (email) {
    const row = dao.findOne(tableName, { email })
    if (row) return row
    return null
  },
  findUserById: async function (id) {
    const row = await dao.findOne(tableName, { id })
    if (row) return mapToUserEntity(row)
    return null
  },
  insertUser: async function (data) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    data.password = await bcrypt.hash(data.password, salt)
    const row = await dao.createOne(tableName, data)
    if (row) return mapToUserEntity(row)
    return null
  },
  mapToUserEntity,
  queryUsers: async function (query) {
    const rows = await dao.findMany(tableName, query)
    return rows.map((row) => mapToUserEntity(row))
  },
  updateLastLogin: function (id) {
    return dao.updateOne(tableName, id, {
      lastLoginAt: new Date().toISOString(),
    })
  },
}
