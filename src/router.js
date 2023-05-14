import { App } from '@tinyhttp/app'
import sirv from 'sirv'

import roomService from './services/roomService.js'
import playerService from './services/playerService.js'
import { WS_ACTIONS, WS_EVENTS } from './constants.js'

const router = new App()
const root = `${process.cwd()}/src`

router.get('/', async (req, res) => {
  return res.sendFile('public/index.html', { root })
})

router.use('/public', sirv(`${root}/public`))

router.use('/ws', async (req, res) => {
  if (!req.ws) return res.send('Only ws connection allowed')

  const ws = await req.ws()

  ws.on('message', (message) => {
    const packet = JSON.parse(message.toString())

    if (packet.type === WS_EVENTS.CONNECTION) {
      const player = playerService.createPlayer(packet.data.playerName, ws)
      ws.send(JSON.stringify({
        type: WS_EVENTS.SUCCESS,
        data: player,
      }))
    }

    if (!packet.type) return ws.close()

    ws.send(JSON.stringify({
      type: WS_EVENTS.LOBBY,
      op: WS_ACTIONS.LOBBY.LIST,
      data: {
        rooms: roomService.getRooms(),
      }
    }))
  })
})

export default router
