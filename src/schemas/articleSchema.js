'use strict'

const schema = {
  type: 'Object',
  required: true,
  properties: {
    id: {
      type: 'integer',
      required: true,
    },
    text: {
      type: 'string',
      required: true,
    },
  },
}

module.exports = {
  articleSchema: schema,
}
