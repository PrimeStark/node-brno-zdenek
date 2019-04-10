'use strict'

const Router = require('koa-router')
const { validate } = require('./utils/validation')
const log = require('./logger')
// Users
const users = require('./data/users')
const userSchema = require('./schemas/userSchema')
// Articles
const articles = require('./data/articles')
const articleSchema = require('./schemas/articleSchema')

const router = new Router()

router.get('/', ctx => {
  ctx.body = 'Hi from base route'
})

// User routes
router.get('/users', ctx => {
  ctx.body = users
})

router.get('/users/:id', ctx => {
  const user = users.find(item => item.id === Number(ctx.params.id))

  if (!user) {
    ctx.status = 404
    log.warn('User not found')
    return
  }

  ctx.body = user
})

router.post('/users', ctx => {
  const validation = validate(ctx.request.body, userSchema)

  if (!validation.valid) {
    ctx.status = 400
    ctx.body = {
      errors: validation.errors,
    }
    return
  }

  users.push(ctx.request.body)
  ctx.body = users
})

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

module.exports = router.routes()
