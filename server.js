const fastify = require('fastify')
const path = require('path')

const server = fastify({ logger: true })
const port = process.env.PORT

server.register(require('@fastify/websocket'))

server.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/'
})

server.register(async (fastify) => {
  server.get('/ws', { websocket: true }, (connection, req) => {
    connection.socket.on('message', message => {
      connection.socket.send('hi from server')
    })
  })
})

server.get('/', async (req, res) => {
  return res.sendFile('index.html')
})

const start = async () => {
  await server.listen({
    port,
    host: '0.0.0.0'
  })
}

start()