'use strict'

const { validate } = require('../utils/validation')
const articleOperations = require('../operations/articles')
const articleSchemas = require('../schemas/articleSchema')

async function getAll(ctx) {
  ctx.body = await articleOperations.getAll()
}

async function getById(ctx) {
  const input = {
    id: parseInt(ctx.params.id),
  }

  validate(articleSchemas.articleId, input)

  ctx.body = await articleOperations.getById(input)
}

async function create(ctx) {
  const article = {
    title: ctx.request.body.title,
    content: ctx.request.body.content,
  }

  validate(articleSchemas.article, article)

  ctx.body = await articleOperations.create(ctx.request.body)
}

// exports
module.exports = {
  getAll,
  getById,
  create,
}
