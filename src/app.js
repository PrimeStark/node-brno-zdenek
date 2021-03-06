'use strict'

// Koa and middleware
const Koa = require('koa')
const koaCompress = require('koa-compress')
const koaCors = require('kcors')
const koaBody = require('koa-body')
// My server functions
const routes = require('./routes')
const log = require('./utils/logger')
const config = require('./config')

const app = new Koa()

app.use(koaCompress())
app.use(koaCors())
app.use(koaBody())

app.use(routes)

const services = {
  server: null,
}

app.start = async () => {
  log.info('Server starting')

  services.server = await new Promise((resolve, reject) => {
    const listener = app.listen(config.server.port, err =>
      err ? reject(err) : resolve(listener)
    )
  })

  log.info(`Server listening on port ${config.server.port}.`)
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
