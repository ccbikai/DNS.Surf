import { handle } from 'hono/vercel'
import app from '../lib/dns-query'

export const config = {
  runtime: 'edge',
}

export default handle(app)
