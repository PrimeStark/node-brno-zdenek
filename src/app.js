'use strict'

// Koa and middleware
const Koa = require('koa')
const koaCompress = require('koa-compress')
const koaCors = require('kcors')
const koaBody = require('koa-body')
// My server functions
const router = require('./router')
const log = require('./logger')
const config = require('./config')

const app = new Koa()

app.use(koaCompress())
app.use(koaCors())
app.use(koaBody())

app.use(router)

const services = {
  server: null,
}

app.start = async () => {
  log.info('Server starting')

  services.server = await new Promise((resolve, reject) => {
    const listener = app.listen(config.port, err =>
      err ? reject(err) : resolve(listener))
  })

  log.info('All services have started')
}

app.stop = () => {
  log.info('Shutting down server')

  services.server.close()
}

app
  .start()
  .then(() => log.info('App is running...'))
  .catch(err => log.error(err))

process.on('SIGINT', () => app.stop())
process.on('SIGTERM', () => app.stop())
