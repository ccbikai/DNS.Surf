import * as z from 'zod'
import { isDomain } from './dns-utils.js'

function addLink(text) {
  const isIP = z.string().ip().safeParse(text).success
  if (isIP) {
    return (
      <a href={`https://html.zone/ip/query?ip=${text}`} target="blank" rel="noopener" className="inline-flex items-center">
        {text}
        <span title="IP Info" className="ml-1 w-4 h-4 icon-[oui--i-in-circle]"></span>
      </a>
    )
  }
  else if (isDomain(text)) {
    return (
      <a href={`https://html.zone/whois/${text}`} target="blank" rel="noopener" className="inline-flex items-center">
        {text}
        <span title="WHOIS" className="ml-1 w-4 h-4 icon-[mynaui--letter-w-circle]"></span>
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

export default function DNSAnswer({ result }) {
  return Array.isArray(result.answers)
    ? (
        <div>
          {
            result.answers.map((answer) => {
              return (
                <div key={answer?.data || answer}>
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
          }
        </div>
      )
    : null
}
