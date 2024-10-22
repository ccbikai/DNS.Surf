import type { Metadata } from 'next'
import DNSPanel from '@/components/dns/dns-panel'
import Layout from '@/components/layouts/default'

export const metadata: Metadata = {
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/` : undefined,
  },
}

export default function Home() {
  return (
    <Layout>
      <DNSPanel />
    </Layout>
  )
}
