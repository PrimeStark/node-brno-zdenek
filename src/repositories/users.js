'use strict'

const R = require('ramda')
const errors = require('../utils/errors')
const users = require('../data/users')

function findByEmail(email) {
  return R.find(R.propEq('email', email), users)
}

function findById(id) {
  const user = R.find(R.propEq('id', id), users)

  if (!user) {
    throw new errors.NotFoundError()
  }

  return user
}

function create(user) {
  user.id = users.length + 1
  users.push(user)
  return user
} 

module.exports = {
  findByEmail,
  findById,
  create
}
