import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { REGIONS } from '@/config'
import { DNSResultTableRow } from './dns-result-table-row'

export default function DNSTable({ formData }) {
  return (
    <>
      {formData.name
        ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[240px]">LOCATION</TableHead>
                  <TableHead>ANSWERS</TableHead>
                  <TableHead className="w-[120px]">RCODE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.keys(REGIONS).map(region => (
                  <DNSResultTableRow
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
