import express from 'express'

import { validateLogin, validateNewUser } from './user.validators.js'
import { statusCodes } from '../../../utils/status.js'
import userService from './user.service.js'

const router = express.Router()

router.post('/', validateNewUser, async (req, res, next) => {
  try {
    const user = await userService.createUser(res.locals.data)
    res.status(statusCodes.OK).json({
      success: true,
      message: `Created user: ${user.alias}`,
      data: user,
    })
  } catch (err) {
    next(err)
  }
})

router.post('/login', validateLogin, async (req, res, next) => {
  try {
    const data = await userService.loginUser(res.locals.data)
    res.status(statusCodes.OK).json({
      success: true,
      message: `Logged in user: ${data.user.alias}`,
      data,
    })
  } catch (err) {
    next(err)
  }
})

export default router
