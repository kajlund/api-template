import knex from 'knex'

import knexfile from '../knexfile.js'
import log from './logger.js'

const environment = process.env.NODE_ENV || 'development'
const myKnex = knex(knexfile[environment])

const db = {
  knex: myKnex,
  connect: async () => {
    try {
      await myKnex('knex_migrations')
      log.info('DB connected')
    } catch (err) {
      log.error({ err }, 'Database connection error:')
    }
  },
  disconnect: async () => {
    try {
      await myKnex.destroy()
      log.info('DB connection closed')
    } catch (err) {
      log.error({ err }, 'Database disconnection error:')
    }
  },
}

export default db
