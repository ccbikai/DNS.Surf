import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import DNSAnswer from './dns-answer.jsx'
import { getDNSAnswer, isSameQuery } from './dns-utils.js'

export function DNSResultTableRow({ formData, region, config }) {
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
    <TableRow ref={ref}>
      {isSameQuery(result, formData)
        ? (
            <>
              <TableCell className="font-medium">
                {regionInfo}
              </TableCell>
              <TableCell>
                <DNSAnswer result={result} />
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
