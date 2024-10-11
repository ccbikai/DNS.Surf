'use client'
import { useState } from 'react'
import { DNSFeature } from './dns-feature'
import { DNSForm } from './dns-form'
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
        formData.name ? <DNSTable formData={formData} /> : <DNSFeature />
      }
    </>
  )
}
