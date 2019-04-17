'use strict'

const Router = require('koa-router')
const handler = require('../middleware/errors')
const articles = require('../controllers/articles')
const users = require('../controllers/users')

const router = new Router()

router.use(handler.handleErrors)

router.post('/sessions/user', users.login)

router.get('/articles', articles.getAll)
router.get('/articles/:id', articles.getById)
router.post('/articles', articles.create)

router.use(handler.handleNotFound)

module.exports = router.routes()
