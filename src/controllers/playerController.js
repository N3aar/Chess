const { playerService } = require('../services')

const playerController = async (fastify, options) => {
    fastify.get('/player/:playerId', async (req, res) => {
      const player = await playerService.getPlayer(req, res)
      return res.send({
        id: player.id,
        name: player.name,
      })
    })
}

module.exports = playerController
