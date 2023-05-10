const { WS_EVENTS } = require('./constants')
const { playerController, roomController } = require('./controllers')
const { playerService } = require('./services')

const routes = async (fastify, options) => {
  fastify.register(roomController)
  fastify.register(playerController)

  fastify.get('/', async (req, res) => {
    return res.sendFile('index.html')
  })

  fastify.get('/ws', { websocket: true }, (connection, req) => {
    connection.socket.on('message', (message) => {
      const packet = JSON.parse(message.toString())

      if (packet.type === WS_EVENTS.WS_CONNECTION) {
        const player = playerService.createPlayer(packet.data.playerName, connection.socket)
        connection.socket.send(JSON.stringify({
          type: WS_EVENTS.WS_SUCCESS,
          data: player,
        }))
      }

      if (!packet.type) return connection.socket.close()

      // kill connection if send nothing in 30 seconds
      // connection.socket.on('pong', () => {
      //   console.log('pong')
      //   connection.socket.isAlive = true
      // })

      // setInterval(() => {
      //   if (connection.socket.isAlive === false) {
      //     return connection.socket.terminate()
      //   }

      //   connection.socket.isAlive = false
      //   connection.socket.ping(() => {})
      //   console.log('ping')
      // }, 5000)

      // connection.socket.send(JSON.stringify(packet))
    })
  })
}

module.exports = routes
