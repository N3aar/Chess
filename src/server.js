const fastify = require('fastify')
const path = require('path')

const server = fastify({
  logger: {
    level: 'info'
  }
})
const port = process.env.PORT || 3000

const routes = require('./appRoutes')

server.register(require('@fastify/websocket'))

server.register(require('@fastify/static'), {
  root: path.join(__dirname, '../public'),
  prefix: '/public/'
})

server.register(routes)

const start = async () => {
  await server.listen({
    port,
    host: '0.0.0.0'
  }, (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
  })
}

start()
