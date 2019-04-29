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

async function signUp(ctx) {
  const input = {
    name: ctx.request.body.name,
    email: ctx.request.body.email,
    password: ctx.request.body.password
  }

  validate(userSchema.signUp, input)
  ctx.body = await operations.signUp(input)
}

module.exports = {
  login,
  signUp
}
