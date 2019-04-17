'use strict'

const jwtToken = {
  type: 'Object',
  required: true,
  properties: {
    jwtToken: { type: 'string', required: true },
  },
}

const login = {
  type: 'Object',
  required: true,
  properties: {
    email: {
      type: 'string',
      required: true,
      format: 'email',
    },
    password: {
      type: 'string',
      required: true,
    },
  },
}

module.exports = {
  jwtToken,
  login,
}
