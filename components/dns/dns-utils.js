import { Buffer } from 'buffer'
import dohjs from 'dohjs'
// const punycode = require('punycode/')
import punycode from 'punycode/punycode.js'
import { getFlag } from './utils.ts'

const { makeQuery, dnsPacket } = dohjs

function isTld(tld) {
  if (tld.startsWith('.')) {
    tld = tld.substring(1)
  }

  return /^([a-z]{2,64}|xn[a-z0-9-]{5,})$/i.test(punycode.toASCII(tld))
}

export function isDomain(domain) {
  if (domain.endsWith('.')) {
    domain = domain.substring(0, domain.length - 1)
  }

  const labels = punycode.toASCII(domain).split('.').reverse()
  const labelTest = /^([a-z0-9-]{1,64}|xn[a-z0-9-]{5,})$/i

  return (
    labels.length > 1
    && labels.every((label, index) => {
      return index ? labelTest.test(label) && !label.startsWith('-') && !label.endsWith('-') : isTld(label)
    })
  )
}

export function isSameQuery(oldQuery, newQuery) {
  return (
    oldQuery.name === newQuery.name
    && oldQuery.type === newQuery.type
    && oldQuery.resolver === newQuery.resolver
    && oldQuery.time === newQuery.time
  )
}

export async function getDNSAnswer(formData, region, config) {
  const isCloudflare = config.provider === 'cloudflare'
  const dnsHost = isCloudflare ? process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER_HOST : ''
  // console.info('dnsHost', dnsHost, config)
  const dnsQueryParams = makeQuery(formData.name, formData.type)
  const dnsQueryData = dnsPacket
    .encode(dnsQueryParams)
    .toString('base64')
    .toString('utf-8')
    .replace(/=/g, '')
  const dnsRes = await fetch(
    `${dnsHost}/api/region/${region}?dns=${dnsQueryData}&resolver=${formData.resolver}&region=${region}&_=${Math.random()}`,
    {
      headers: {
        Accept: 'application/dns-message',
      },
    },
  )
  if (!dnsRes.ok) {
    throw new Error(dnsRes.statusText)
  }
  const dnsData = await dnsRes.arrayBuffer()
  const dnsRecords = dnsPacket.decode(Buffer.from(dnsData))
  const answers = dnsRecords.answers || []
  console.info('dnsRecords', dnsRecords)

  let regionInfo = null
  let countryCode = null
  if (isCloudflare) {
    const cloudflareRegionInfo = dnsRes.headers.get('X-Country')
    const cloudflareLocationInfo = dnsRes.headers.get('X-Location')
    regionInfo = `${getFlag(cloudflareRegionInfo) || ''} ${cloudflareLocationInfo || ''}`
    countryCode = cloudflareRegionInfo
  }
  else {
    regionInfo = `${getFlag(config.countryCode) || ''} ${config.location || ''}`
    countryCode = config.countryCode
  }

  return {
    dnsRes,
    dnsRecords,
    answers,
    regionInfo,
    countryCode,
  }
}
