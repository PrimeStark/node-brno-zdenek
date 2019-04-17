'use strict'

const schema = {
  type: 'Object',
  required: true,
  properties: {
    id: {
      type: 'integer',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    nick: {
      type: 'string',
      required: true,
    },
    ability: {
      type: 'string',
      required: true,
    },
    impairments: {
      type: 'array',
      required: true,
    },
  },
}

module.exports = {
  userSchema: schema,
}
