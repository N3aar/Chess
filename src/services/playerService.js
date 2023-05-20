import crypto from 'crypto'
import { PLAYER_STATUS } from '../constants.js'

const players = new Map()

const createNewPlayer = (playerName, socket) => {
  const player = {
    name: playerName,
    status: PLAYER_STATUS.NO_ROOM,
    id: crypto.randomBytes(4).toString('hex'),
    socket,
  }

  return player
}

const playerService = {
  createPlayer: (playerName, socket) => {
    const newPlayer = createNewPlayer(playerName, socket)
    players.set(newPlayer.id, newPlayer)

    return {
      id: newPlayer.id,
      name: newPlayer.name,
    }
  },

  getPlayer: async (id) => {
    return players.get(id)
  }
}

export default playerService
