import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { REGIONS } from '@/config'

import { DNSResult } from './dns-result'

export function DNSTable({ formData }) {
  return (
    <>
      {formData.name
        ? (
            <Table className="mt-8 mx-auto lg:w-11/12">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[240px]">Location</TableHead>
                  <TableHead>ANSWERS</TableHead>
                  <TableHead className="w-[120px]">RCODE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.keys(REGIONS).map(region => (
                  <DNSResult
                    key={`${region}-${formData.time}`}
                    formData={formData}
                    region={region}
                    config={REGIONS[region]}
                  />
                ))}
              </TableBody>
            </Table>
          )
        : ''}
    </>
  )
}
