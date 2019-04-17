'use strict'

const R = require('ramda')
const errors = require('../utils/errors')
const users = require('../data/users')

function findByEmail(email) {
  const user = R.find(R.propEq('email', email), users)

  if (!user) {
    throw new errors.NotFoundError()
  }

  return user
}

module.exports = {
  findByEmail,
}
