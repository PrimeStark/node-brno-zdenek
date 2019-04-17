'use strict'
const operations = require('../operations/users')

async function login(ctx) {
  const input = {
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  }

  // validate()
  ctx.body = await operations.login(input)
}

module.exports = {
  login,
}
