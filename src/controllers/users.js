'use strict'
const operations = require('../operations/users')
const { validate } = require('../utils/validation')
const userSchema = require('../schemas/userSchema')

async function login(ctx) {
  const input = {
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  }

  validate(userSchema.login, input)
  ctx.body = await operations.login(input)
}

module.exports = {
  login,
}
