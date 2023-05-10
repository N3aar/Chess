const crypto = require('crypto')
const { PLAYER_STATUS } = require('../constants')

const createNewPlayer = (playerName, socket) => {
  const player = {
    id: crypto.randomBytes(16).toString('hex'),
    name: playerName,
    status: PLAYER_STATUS.WAITING,
    socket,
  }

  return player
}

const playerService = {
  createPlayer: async (req, res) => {
    const { playerName } = req.body
    const newPlayer = createNewPlayer(playerName)
    player.set(newPlayer.id, newPlayer)
  },

  getPlayer: async (req, res) => {
    const { playerId } = req.params
    return player.get(playerId)
  }
}

module.exports = playerService
