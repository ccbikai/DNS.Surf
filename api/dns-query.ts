import app from '../lib/dns-query'
import { handle } from 'hono/vercel'

export const config = {
  runtime: 'edge'
}

export default handle(app)