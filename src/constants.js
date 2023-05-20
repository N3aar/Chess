const ROOM_STATUS = {
  WAITING: 'WAITING',
  PLAYING: 'PLAYING',
  FINISHED: 'FINISHED',
}

const PLAYER_STATUS = {
  WAITING: 'WAITING',
  PLAYING: 'PLAYING',
  FINISHED: 'FINISHED',
  WATCHING: 'WATCHING',
  NO_ROOM: 'NO_ROOM',
}

const COLORS = {
  BLACK: 'BLACK',
  WHITE: 'WHITE',
}

const WS_EVENTS = {
  CONNECTION: 'connection',
  SUCCESS: 'success',
  ERROR: 'error',
  LOBBY: 'lobby',
  ROOM: 'room',
  GAME: 'game',
}

const WS_ACTIONS = {
  ROOM: {
    CREATE: 'create',
    JOIN: 'join',
    LEAVE: 'leave',
  },
  LOBBY: {
    LIST: 'list',
    INFO: 'info',
  }
}

export {
  ROOM_STATUS,
  PLAYER_STATUS,
  COLORS,
  WS_EVENTS,
  WS_ACTIONS,
}
