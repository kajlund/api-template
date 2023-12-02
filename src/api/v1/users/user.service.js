import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { AppError } from '../../../utils/errors.js'
import { statusCodes, reasonPhrases } from '../../../utils/status.js'
import userRepo from './user.repository.js'

const unauthorizedError = new AppError(statusCodes.UNAUTHORIZED, reasonPhrases.UNAUTHORIZED, 'Authentication failed')

export default {
  createUser: async function (data) {
    const found = await userRepo.findUserByEmail(data.email)
    if (found) throw new AppError(statusCodes.BAD_REQUEST, reasonPhrases.BAD_REQUEST, 'User already exists')
    const user = await userRepo.insertUser(data)
    return user
  },

  getUserList: function (query) {
    return userRepo.queryUsers(query)
  },

  loginUser: async function (data) {
    const user = await userRepo.findUserByEmail(data.email)
    if (!user) throw unauthorizedError
    const pwdOK = await bcrypt.compare(data.password, user.password)
    if (!pwdOK) throw unauthorizedError
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    })
    if (!token) throw unauthorizedError
    await userRepo.updateLastLogin(user.id)
    return {
      token,
      user: userRepo.mapToUserEntity(user),
    }
  },
}
