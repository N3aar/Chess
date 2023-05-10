const crypto = require('crypto')
const { ROOM_STATUS } = require('../constants')

const room = new Map()

const createNewRoom = (roomName, maxPlayers) => {
  const room = {
    players: [],
    id: crypto.randomBytes(16).toString('hex'),
    name: roomName,
    status: ROOM_STATUS.WAITING,
    turn: 0,
    board: [],
    maxPlayers: 2,
    password: '',
  }

  return room
}

const roomService = {
  createRoom: async (req, res) => {
    const { roomName, maxPlayers } = req.body
    const newRoom = createNewRoom(roomName, maxPlayers)
    room.set(newRoom.id, newRoom)

    return newRoom
  },

  joinRoom: async (req, res) => {
    const { roomId, playerId } = req.body
    const currentRoom = room.get(roomId)

    if (currentRoom.players.length >= currentRoom.maxPlayers) {
      return {
        error: 'Room is full',
      }
    }

    currentRoom.players.push(playerId)
    room.set(roomId, currentRoom)

    return currentRoom
  },

  getRooms: async (req, res) => {
    return [...room.values()]
  },

  getRoom: async (req, res) => {
    const { roomId } = req.params
    return room.get(roomId)
  },
}

module.exports = roomService
