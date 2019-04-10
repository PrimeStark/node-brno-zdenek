'use strict'

const Router = require('koa-router')
const { validate } = require('../utils/validation')
const log = require('../utils/logger')
const articles = require('../data/articles')
const articleSchema = require('../schemas/articleSchema')

const router = new Router()

// Article routes
router.get('/articles', ctx => {
  ctx.body = articles
})

router.get('/articles/:id', ctx => {
  const article = articles.find(item => item.id === Number(ctx.params.id))

  if (!article) {
    ctx.status = 404
    log.warn('Article not found')
    return
  }

  ctx.body = article
})

router.post('/articles', ctx => {
  const validation = validate(ctx.request.body, articleSchema)

  if (!validation.valid) {
    ctx.status = 400
    ctx.body = {
      errors: validation.errors,
    }
    return
  }

  articles.push(ctx.request.body)
  ctx.body = articles
})

router.delete('/articles/:id', ctx => {
  const articleIndex = articles.findIndex(
    item => item.id === Number(ctx.params.id)
  )

  if (!articleIndex) {
    ctx.status = 404
    log.warn('Article not found')
    return
  }

  articles.splice(articleIndex, 1)
  ctx.body = articles
})

module.exports = router.routes()
