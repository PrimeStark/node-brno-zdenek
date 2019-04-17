'use strict'

const articleId = {
  type: 'Object',
  required: true,
  properties: {
    id: {
      type: 'integer',
      required: true,
      min: 1,
      max: 10000,
    },
  },
}

const article = {
  type: 'Object',
  required: true,
  properties: {
    title: {
      type: 'string',
      required: true,
    },
    content: {
      type: 'string',
      required: true,
    },
  },
}

module.exports = {
  articleId,
  article,
}
