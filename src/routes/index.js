'use strict'

const Router = require('koa-router')
const handler = require('../middleware/errors')
const articles = require('../controllers/articles')

const router = new Router()

router.use(handler.handleErrors)

router.get('/articles', articles.getAll)
router.get('/articles/:id', articles.getById)
router.post('/articles', articles.create)

router.use(handler.handleNotFound)

module.exports = router.routes()
