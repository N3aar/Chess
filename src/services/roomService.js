import crypto from 'crypto'
import { ROOM_STATUS } from '../constants.js'

const room = new Map()

const createNewRoom = (roomName, maxPlayers = 2) => {
  const room = {
    id: crypto.randomBytes(4).toString('hex'),
    name: roomName,
    password: '',
    maxPlayers,
    players: [],
    status: ROOM_STATUS.WAITING,
    owner: '',
    board: [],
  }

  return room
}

const roomService = {
  createRoom: (name, maxPlayers) => {
    const newRoom = createNewRoom(name, maxPlayers)
    room.set(newRoom.id, newRoom)

    return newRoom
  },

  joinRoom: (roomId, playerId) => {
    const room = room.get(roomId)

    if (!room) {
      return {
        error: 'Room not found',
      }
    }

    if (room.players.length >= room.maxPlayers) {
      return {
        error: 'Room is full',
      }
    }

    if (room.players.length == 0) room.owner = playerId
    room.players.push(playerId)

    room.set(roomId, room)
    return room
  },

  getRooms: () => {
    return [...room.values()]
  },

  getRoom: (id) => {
    return room.get(id)
  },
}

export default roomService
