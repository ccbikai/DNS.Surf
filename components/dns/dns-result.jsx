import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useMediaQuery } from '@uidotdev/usehooks'
import dynamic from 'next/dynamic'

const DNSResultMap = dynamic(() => import('./dns-result-map'), { ssr: false })
const DNSResultTable = dynamic(() => import('./dns-result-table'), { ssr: false })

export default function DNSResult({ formData }) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const defaultTab = isMobile ? 'table' : 'map'

  return (
    <Tabs defaultValue={defaultTab} className="my-4 mx-auto lg:w-11/12 space-y-8">
      <TabsList>
        <TabsTrigger value="map">Map</TabsTrigger>
        <TabsTrigger value="table">Table</TabsTrigger>
      </TabsList>
      <TabsContent value="map" className="[&_>div]:outline-none">
        <DNSResultMap formData={formData} />
      </TabsContent>
      <TabsContent value="table">
        <DNSResultTable formData={formData} />
      </TabsContent>
    </Tabs>
  )
}
