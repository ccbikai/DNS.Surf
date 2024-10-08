import { Buffer } from 'buffer'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

import { TableCell, TableRow } from '@/components/ui/table'
import dohjs from 'dohjs'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import * as z from 'zod'
import { isDomain } from './dns-utils.js'

import { getFlag } from './utils.ts'

const { makeQuery, dnsPacket } = dohjs

function isSameQuery(oldQuery, newQuery) {
  return (
    oldQuery.name === newQuery.name
    && oldQuery.type === newQuery.type
    && oldQuery.resolver === newQuery.resolver
    && oldQuery.time === newQuery.time
  )
}

function addLink(text) {
  const isIP = z.string().ip().safeParse(text).success
  if (isIP) {
    return (
      <a href={`https://html.zone/ip/query?ip=${text}`} target="blank" rel="noopener" className="inline-flex items-center">
        {text}
        <span title="IP Info" class="ml-1 w-4 h-4 icon-[oui--i-in-circle]"></span>
      </a>
    )
  }
  else if (isDomain(text)) {
    return (
      <a href={`https://html.zone/whois/${text}`} target="blank" rel="noopener" className="inline-flex items-center">
        {text}
        <span title="WHOIS" class="ml-1 w-4 h-4 icon-[mynaui--letter-w-circle]"></span>
      </a>
    )
    // return <span>{text}<a href={`https://html.zone/whois/${text}`} target="blank" rel="noopener" title="WHOIS" className="bg-gray-100 text-gray-500 text-xs px-1 ml-1 w-5 inline-block text-center py-0.5 rounded-full">w</a></span>
  }
  return text
}

function FormatAnswer({ answer }) {
  if (['MX'].includes(answer.type)) {
    return (
      <>
        <span>{answer.data.preference}</span>
        <span className="ml-2">{answer.data.exchange}</span>
      </>
    )
  }
  else if (['SOA'].includes(answer.type)) {
    return (
      <>
        <span>{answer.data.mname}</span>
        <span className="ml-2">{answer.data.rname}</span>
        <span className="ml-2">{answer.data.serial}</span>
        <span className="ml-2">{answer.data.refresh}</span>
        <span className="ml-2">{answer.data.retry}</span>
        <span className="ml-2">{answer.data.expire}</span>
        <span className="ml-2">{answer.data.minimum}</span>
      </>
    )
  }
  else if (['TXT'].includes(answer.type)) {
    return Array.isArray(answer.data)
      ? answer.data.map(item => <span key={item}>{new TextDecoder().decode(item)}</span>)
      : ''
  }
  else {
    return typeof answer.data === 'string' ? addLink(answer.data) : JSON.stringify(answer.data)
  }
}

export function DNSResult({ formData, region, config }) {
  const [result, setResult] = useState({})
  const [regionInfo, setRegionInfo] = useState(null)

  const dnsQuery = async () => {
    setRegionInfo(null)
    setResult({})
    try {
      const isCloudflare = config.provider === 'cloudflare'
      const dnsHost = isCloudflare ? process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER_HOST : ''
      console.info('dnsHost', dnsHost, config)
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
      if (isCloudflare) {
        const cloudflareRegionInfo = dnsRes.headers.get('X-Country')
        const cloudflareLocationInfo = dnsRes.headers.get('X-Location')
        setRegionInfo(`${getFlag(cloudflareRegionInfo) || ''} ${cloudflareLocationInfo || ''}`)
      }
      else {
        setRegionInfo(`${config.flag || ''} ${config.location || ''}`)
      }
      if (formData.time < result.time) {
        return
      }
      setResult({
        ...formData,
        rcode: dnsRecords.rcode,
        answers,
      })
    }
    catch (error) {
      console.error(error)
      setResult({
        error: error.message,
      })
    }
  }

  const { ref } = useInView({
    threshold: 0,
    triggerOnce: true,
    onChange: (inView) => {
      if (inView && !result.time) {
        dnsQuery()
      }
    },
  })

  return (
    <TableRow key={region} ref={ref}>
      {isSameQuery(result, formData)
        ? (
            <>
              <TableCell className="font-medium">
                {regionInfo}
              </TableCell>
              <TableCell>
                {Array.isArray(result.answers)
                  ? result.answers.map((answer) => {
                    return (
                      <div key={answer}>
                        <span className="text-sm mr-2">
                          {' '}
                          <FormatAnswer answer={answer} />
                          {' '}
                        </span>
                        <span className="text-xs text-gray-600">
                          TTL:
                          {' '}
                          {answer.ttl}
                        </span>
                      </div>
                    )
                  })
                  : ''}
              </TableCell>
              <TableCell>
                <Badge
                  variant={result.rcode === 'NOERROR' ? 'default' : 'destructive'}
                >
                  {result.rcode}
                </Badge>
              </TableCell>
            </>
          )
        : (result.error
            ? (
                <TableCell>
                  {result.error}
                </TableCell>
              )
            : (
                <>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                </>
              ))}
    </TableRow>
  )
}
