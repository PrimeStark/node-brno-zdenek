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

const signUp = {
  type: "Object",
  required: true,
  properties: {
    name: {
      type: 'string',
      required: true,
      pattern: '^[A-Za-z. -]+$',
    },
    email: {
      type: 'string',
      required: true,
      format: 'email',
    },
    password: {
      type: 'string',
      required: true,
    },
  }
}

module.exports = {
  jwtToken,
  login,
  signUp
}
