'use strict'

const schema = {
  type: 'Object',
  required: true,
  properties: {
    email: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
  },
}

module.exports = {
  userSchema: schema,
}
