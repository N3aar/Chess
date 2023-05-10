const crypto = require('crypto')
const { PLAYER_STATUS } = require('../constants')

const players = new Map()

const createNewPlayer = (playerName, socket) => {
  const player = {
    name: playerName,
    status: PLAYER_STATUS.NO_ROOM,
    socket,
  }

  return player
}

const playerService = {
  createPlayer: async (req, res) => {
    const { playerName } = req.body
    const newPlayer = createNewPlayer(playerName)
    players.set(newPlayer.id, newPlayer)
  },

  getPlayer: async (req, res) => {
    const { playerId } = req.params
    return players.get(playerId)
  }
}

module.exports = playerService
