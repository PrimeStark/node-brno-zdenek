'use strict'
const logger = require('../utils/logger')
const userRepo = require('../repositories/users')
const errors = require('../utils/errors')

async function login(input) {
  logger.info({ input }, 'Login has started')
  const user = await userRepo.findByEmail(input.email.toLowerCase())

  if (!user) {
    throw new errors.UnauthorizedError()
  }

  return {
    id: user.id,
    email: user.email,
    // accessToken
  }
}

module.exports = {
  login,
}
