import { parseArgs } from 'node:util'
import { ofetch } from 'ofetch'
import { ProxyAgent, setGlobalDispatcher } from 'undici'
import { CLOUDFLARE_REGIONS } from '../config/cloudflare'

if (process.env.http_proxy) {
  setGlobalDispatcher(new ProxyAgent(process.env.http_proxy))
}

const { values: args } = parseArgs({
  options: {
    regions: {
      type: 'string',
    },
  },
}) as { values: { regions?: string } }

const WORKER_HOST = process.env.WORKER_HOST

if (!WORKER_HOST) {
  throw new Error('WORKER_HOST environment variable is not set')
}

async function monitorRegion(region) {
  try {
    console.info(`Monitoring ${region}`)
    const res = await ofetch.raw(`https://${WORKER_HOST}/api/region/global?dns=AAABAAABAAAAAAAAA2RucwRzdXJmAAABAAE&resolver=cloudflare&region=${region}&_=${Date.now()}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'application/dns-message',
      },
      timeout: 5000,
      retry: 5,
      retryDelay: 500,
      responseType: 'blob',
    })
    if (res.ok) {
      const expectedRegion = region.replace(/\d/g, '').toUpperCase()
      const workerRegion = (res.headers.get('x-country') || '').toUpperCase()
      if (expectedRegion !== workerRegion) {
        throw new Error(`Expected region ${expectedRegion} but got ${workerRegion}`)
      }
    }
    else {
      throw new Error(`Failed to monitor ${region}: ${res.statusText}`)
    }

    console.info(`${region} is up`)
    return {
      region,
      status: 'ok',
    }
  }
  catch (e) {
    console.warn(`${region} is down: ${e.message}`)
    return {
      region,
      status: 'error',
      error: e.message,
    }
  }
}

async function main() {
  console.info('Starting monitor')
  const unavailableRegions = []
  const regions = args.regions ? args.regions.split(',') : Object.keys(CLOUDFLARE_REGIONS)
  for (const region of regions) {
    const res = await monitorRegion(region)
    if (res.status === 'error') {
      unavailableRegions.push(res)
    }
  }
  console.info('Monitor finished')
  if (unavailableRegions.length > 0) {
    console.error('Unavailable regions:', unavailableRegions.map(region => region.region).join(','), unavailableRegions)
    process.exit(1)
  }
}

main()
