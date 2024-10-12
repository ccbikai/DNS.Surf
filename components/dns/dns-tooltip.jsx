import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect, useState } from 'react'
import DNSAnswer from './dns-answer.jsx'
import { getDNSAnswer, isSameQuery } from './dns-utils.js'

export function DNSTooltip({ formData, region, config }) {
  const [result, setResult] = useState({})
  const [regionInfo, setRegionInfo] = useState(null)

  const dnsQuery = async () => {
    setRegionInfo(null)
    setResult({})
    try {
      const { regionInfo, dnsRecords, answers } = await getDNSAnswer(formData, region, config)
      setRegionInfo(regionInfo)
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

  useEffect(() => {
    dnsQuery()
  }, [formData, region, config])

  return isSameQuery(result, formData)
    ? (
        <div key={region} className="space-y-2">
          <div className="text-base font-medium text-gray-900">{regionInfo}</div>
          <DNSAnswer result={result} />
          <Badge variant={result.rcode === 'NOERROR' ? 'default' : 'destructive'}>
            {result.rcode}
          </Badge>
        </div>
      )
    : (
        result.error
          ? <div className="text-base">{result.error}</div>
          : (
              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-20" />
              </div>
            )
      )
}
