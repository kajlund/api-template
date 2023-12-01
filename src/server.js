import http from 'http'
import util from 'util'

import dotenv from 'dotenv'

dotenv.config()

import log from './logger.js'
import app from './app.js'
import db from './db.js'

process.on('uncaughtException', (err) => {
  log.fatal(`UNCAUGHT EXCEPTION - ${err.stack || err}`)
  throw err
})

process.on('unhandledRejection', (reason, p) => {
  log.fatal(`UNHANDLED PROMISE REJECTION: ${util.inspect(p)} reason: ${reason}`)
})

process.on('SIGTERM', () => {
  log.info('Clening up and exiting')
  db.disconnect()
})

log.info('Starting server')
http.createServer(app).listen(process.env.PORT, () => {
  log.info(`Server listening on port ${process.env.PORT}`)
})
