import crypto from 'crypto'

import db from '../db.js'

/**
 * @typedef Product
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 */

/**
 * @function findMany
 * @param table string
 * @param query Object
 * @return {Promise<Array<Product>>}
 * */
const findMany = (table, query) => {
  const filter = query && query.filter ? query.filter : {}
  const sort = query && query.sort ? query.sort : 'updatedAt'
  const limit = query && query.limit ? query.limit : 1000
  const skip = query && query.skip ? query.skip : 0

  return db.knex(table).where(filter).orderBy(sort).limit(limit).offset(skip)
}

/**
 * @function findOne
 * @param table string
 * @param qry Object
 * @return {Promise<Product>}
 * */
const findOne = (table, qry) => {
  return db.knex(table).where(qry).first()
}

/**
 * @function createOne
 * @param table string
 * @param data Object
 * @return {Product}
 * */
const createOne = async (table, data) => {
  data.id = crypto.randomUUID()
  const result = await db.knex(table).insert(data).returning('*')
  return result.length ? result[0] : null // Return created one or null
}

/**
 * @function updateOne
 * @param table string
 * @param id string
 * @param data Object
 * @return {Product}
 * */
const updateOne = async (table, id, data) => {
  data.updatedAt = new Date().toISOString()
  const result = await db.knex(table).where('id', id).update(data).returning('*')
  return result.length ? result[0] : null // Returns updated object or null
}

/**
 * @function deleteOne
 * @param table string
 * @param id string
 * @return {bool}
 * */
const deleteOne = async (table, id) => {
  const numAffected = await db.knex(table).where('id', id).del()
  return numAffected > 0
}

export default {
  findMany,
  findOne,
  createOne,
  updateOne,
  deleteOne,
}
