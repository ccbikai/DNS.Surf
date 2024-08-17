import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import doh from '../doh.json'

export const config = {
  runtime: 'edge'
}

const app = new Hono()

const defaultResolver = 'cloudflare'
function getResolver (resolver:string) {
  let dohServer = doh.find((s: string[]) => s[0] === resolver)
  if (!dohServer) {
    dohServer = doh.find((s: string[]) => s[0] === defaultResolver) || []
  }
  return dohServer
}

app.get('*', (c) => {
  const accept = c.req.header('accept') || ''
  const { search } = new URL(c.req.raw.url)
  const { resolver = defaultResolver, dns } = c.req.query()

  let dohServer = getResolver(resolver)
  const DNSapi = /application\/dns-message/.test(accept) ? `${dohServer[1]}?dns=${dns}` : `${dohServer[1]}${search}`
  console.log(DNSapi)
  return fetch(DNSapi, {
    headers: {
      accept: accept,
      'user-agent': c.req.header('User-Agent') || ''
    }
  })
})

export default handle(app)
