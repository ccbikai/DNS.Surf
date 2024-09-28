const env = globalThis.process ? globalThis.process.env : { NEXT_PUBLIC_CLOUDFLARE_WORKER_HOST: true }

export const SITE = {
  title: 'DNS.Surf',
  tagline: 'Querying DNS Resolution Results in Different Regions Worldwide',
  description: 'Querying DNS Resolution Results in Different Regions Worldwide. 1. Supporting DNS Queries from 18 Regions 2.Supporting 100+ DNS Resolvers 3. 100% Run on Vercel',
  keywords: 'DNS.Surf, DNS resolution, DNS query regions, global DNS resolver, Vercel DNS, DNS exploration, DNS technology, DNS services',
  image: 'https://dns.surf/banner.png',
  url: 'https://dns.surf'
}

const VERCEL_REGIONS = {
  hkg1: {
    flag: "🇭🇰",
    location: "Hong Kong",
  },
  hnd1: {
    flag: "🇯🇵",
    location: "Tokyo, Japan",
  },
  kix1: {
    flag: "🇯🇵",
    location: "Osaka, Japan",
  },
  icn1: {
    flag: "🇰🇷",
    location: "Seoul, South Korea",
  },
  sin1: {
    flag: "🇸🇬",
    location: "Singapore",
  },
  bom1: {
    flag: "🇮🇳",
    location: "Mumbai, India",
  },
  syd1: {
    flag: "🇦🇺",
    location: "Sydney, Australia",
  },
  cpt1: {
    flag: "🇿🇦",
    location: "Cape Town, South Africa",
  },
  cdg1: {
    flag: "🇫🇷",
    location: "Paris, France",
  },
  arn1: {
    flag: "🇸🇪",
    location: "Stockholm, Sweden",
  },
  dub1: {
    flag: "🇮🇪",
    location: "Dublin, Ireland",
  },
  lhr1: {
    flag: "🇬🇧",
    location: "London, United Kingdom",
  },
  fra1: {
    flag: "🇩🇪",
    location: "Frankfurt, Germany",
  },
  iad1: {
    flag: "🇺🇸",
    location: "Washington, D.C., United States",
  },
  sfo1: {
    flag: "🇺🇸",
    location: "San Francisco, United States",
  },
  pdx1: {
    flag: "🇺🇸",
    location: "Portland, United States",
  },
  cle1: {
    flag: "🇺🇸",
    location: "Cleveland, United States",
  },
  gru1: {
    flag: "🇧🇷",
    location: "São Paulo, Brazil",
  },
}

const CLOUDFLARE_REGIONS = {
  hk1: {
    provider: 'cloudflare',
  },
  tw1: {
    provider: 'cloudflare',
  },
  jp1: {
    provider: 'cloudflare',
  },
  us1: {
    provider: 'cloudflare',
  },
}

export const REGIONS = env.NEXT_PUBLIC_CLOUDFLARE_WORKER_HOST ? CLOUDFLARE_REGIONS : VERCEL_REGIONS
