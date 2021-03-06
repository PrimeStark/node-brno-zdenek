'use strict'

const logger = require('../utils/logger')
const userRepo = require('../repositories/users')
const errors = require('../utils/errors')
const crypto = require('../utils/crypto')

async function signUp(input) {
  logger.info({ input }, "Signup has started")
  const user = {
    name: input.name,
    email: input.email,
    // TODO: hash pasword
    password: await crypto.hashPassword(input.password)
  }

  const checkExisting = await userRepo.findByEmail(user.email.toLowerCase())
  if (checkExisting) {
    throw new errors.ConflictError("User with this email already exists.")
  }

  const createdUser = userRepo.create(user)
  createdUser.accessToken = await crypto.generateAccessToken(createdUser.id)

  logger.info("Signup has ended")
  return createdUser
}

async function login(input) {
  logger.info({ input }, 'Login has started')
  const user = await userRepo.findByEmail(input.email.toLowerCase())

  if (!user) {
    throw new errors.UnauthorizedError()
  }

  const verifiedPassword = await crypto.comparePasswords(
    input.password,
    user.password
  )
  if (!verifiedPassword) {
    throw new errors.UnauthorizedError()
  }

  const accessToken = await crypto.generateAccessToken(user.id)

  logger.info('Login has ended')
  return {
    id: user.id,
    email: user.email,
    accessToken,
  }
}

async function verifyTokenPayload(input) {
  logger.info({ input }, 'Verifying token started')
  const jwtPayload = await crypto.verifyAccessToken(input.jwtToken)
  const now = Date.now()

  if (!jwtPayload || !jwtPayload.exp || now >= jwtPayload.exp * 1000) {
    throw new errors.UnauthorizedError()
  }

  const userId = Number(jwtPayload.userId)
  const user = await userRepo.findById(userId)

  if (!user) {
    throw new errors.UnauthorizedError()
  }

  logger.info('Veryfying token ended')
  return {
    user,
    loginTimeout: jwtPayload.exp * 1000,
  }
}

module.exports = {
  login,
  verifyTokenPayload,
  signUp
}
