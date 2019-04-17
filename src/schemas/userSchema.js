'use strict'

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
  login,
}
