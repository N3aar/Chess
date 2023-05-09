const { playerService } = require('../services')

const playerController = async (fastify, options) => {
    fastify.post('/player', async (req, res) => {
      const player = await playerService.createPlayer(req, res)
      return res.send(player)
    })

    fastify.get('/player/:playerId', async (req, res) => {
      const player = await playerService.getPlayer(req, res)
      return res.send(player)
    })
}

module.exports = playerController