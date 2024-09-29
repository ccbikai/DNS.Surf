import { CLOUDFLARE_REGIONS } from './cloudflare'
import { VERCEL_REGIONS } from './vercel'

export const SITE = {
  title: 'DNS.Surf',
  tagline: 'Querying DNS Resolution Results in Different Regions Worldwide',
  description: 'Querying DNS Resolution Results in Different Regions Worldwide. 1. Supporting DNS Queries from Different Regions 2.Supporting 100+ DNS Resolvers',
  keywords: 'DNS.Surf, DNS resolution, DNS query regions, global DNS resolver, Clouflare DNS, Vercel DNS, DNS exploration, DNS technology, DNS services',
  image: 'https://dns.surf/banner.png',
  url: 'https://dns.surf'
}

export const REGIONS = process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER_HOST ? CLOUDFLARE_REGIONS : VERCEL_REGIONS
