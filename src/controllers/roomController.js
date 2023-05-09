const { roomService } = require('../services')

const roomController = async (fastify, options) => {

  fastify.post('/room', async (req, res) => {
    const room = await roomService.createRoom(req, res)
    return res.send(room)
  })

  fastify.post('/room/join', async (req, res) => {
    const room = await roomService.joinRoom(req, res)

    if (room.error) return res.send(room)

    return res.send(room)
  })

  fastify.get('/rooms', async (req, res) => {
    const rooms = await roomService.getRooms(req, res)
    return res.send(rooms)
  })

  fastify.get('/room/:roomId', async (req, res) => {
    const room = await roomService.getRoom(req, res)
    return res.send(room)
  })
}

module.exports = roomController
