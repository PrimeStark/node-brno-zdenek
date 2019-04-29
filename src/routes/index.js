'use strict'

const Router = require('koa-router')
const handler = require('../middleware/errors')
const articles = require('../controllers/articles')
const users = require('../controllers/users')
const { authenticate } = require('../middleware/authentication')

const router = new Router()

router.use(handler.handleErrors)

/* Public routes */
router.post('/sessions/user', users.login)
router.post("/users", users.signUp)

/* Private routes */
router.get('/articles', authenticate, articles.getAll)
router.get('/articles/:id', authenticate, articles.getById)
router.post('/articles', authenticate, articles.create)

router.use(handler.handleNotFound)

module.exports = router.routes()
