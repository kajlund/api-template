import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import db from './db.js'
import errorHandler from './utils/error-handler.middleware.js'
import notFoundHandler from './utils/notfound.middleware.js'
import productRouter from './api/v1/products/product.router.js'
import userRouter from './api/v1/users/user.router.js'

const app = express()

// Middleware to handle incoming JSON payloads
app.use(express.json())
// Middleware for url encoding
app.use(express.urlencoded({ extended: true }))
// Parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET))
// Middleware for handling CORS policy
app.use(cors())

// Helper endpoints for service check
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Service running OK' })
})

app.get('/ping', (req, res) => {
  res.status(200).send('Pong')
})

// Route handlers
app.use('/api/v1/products', productRouter)
app.use('/api/v1/users', userRouter)

// 404 Handler
app.use(notFoundHandler)

// Error Handler
app.use(errorHandler)
// Connect database
db.connect()

export default app
