import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { REGIONS } from '../config'

export const config = {
  runtime: 'edge'
}

const app = new Hono().basePath('/api')

app.get('*', (c) =>
  c.json({ message: 'Hello Edge!', regions: REGIONS })
)

export default handle(app)
