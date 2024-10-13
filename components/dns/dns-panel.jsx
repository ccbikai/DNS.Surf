'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useMediaQuery } from '@uidotdev/usehooks'
import { useState } from 'react'
import { DNSFeature } from './dns-feature'
import { DNSForm } from './dns-form'
import { DNSMap } from './dns-map'
import { DNSTable } from './dns-table'

function getNewURL(query) {
  const params = new URLSearchParams()
  params.append('name', query.name)
  params.append('type', query.type)
  params.append('resolver', query.resolver)
  return `${location.pathname}?${params}`
}

export default function DNSPanel() {
  const [formData, setFormData] = useState({})
  const isMobile = useMediaQuery('(max-width: 768px)')
  const defaultTab = isMobile ? 'table' : 'map'

  const onSearch = (query) => {
    query.time = Date.now()
    setFormData(query)
    history.replaceState({}, document.title, getNewURL(query))
  }

  return (
    <>
      {/* <DNSHero/> */}
      <DNSForm onSearch={onSearch} />

      {
        formData.name
          ? (
              <Tabs defaultValue={defaultTab} className="my-4 mx-auto lg:w-11/12 space-y-8">
                <TabsList>
                  <TabsTrigger value="map">Map</TabsTrigger>
                  <TabsTrigger value="table">Table</TabsTrigger>
                </TabsList>
                <TabsContent value="map" className="[&_>div]:outline-none">
                  <DNSMap formData={formData} />
                </TabsContent>
                <TabsContent value="table">
                  <DNSTable formData={formData} />
                </TabsContent>
              </Tabs>
            )
          : <DNSFeature />
      }
    </>
  )
}
