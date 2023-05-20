import { App } from '@tinyhttp/app'
import { tinyws } from 'tinyws'
import router from './router.js'

const app = new App()
const port = process.env.PORT || 3000

app.use(tinyws())
  .use(router)
  .listen(port, () => console.log(`Server running on port ${port}`))

