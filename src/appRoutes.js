const { playerController, roomController } = require('./controllers')

const routes = async (fastify, options) => {
  fastify.register(roomController)
  fastify.register(playerController)

  fastify.get('/', async (req, res) => {
    return res.sendFile('index.html')
  })

  fastify.get('/ws', { websocket: true }, (connection, req) => {
    connection.socket.on('message', message => {
      console.log(message)
      connection.socket.send('hi from server')
    })
  })
}

module.exports = routes
