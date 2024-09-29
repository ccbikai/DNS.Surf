const env = globalThis.process ? globalThis.process.env : { NEXT_PUBLIC_CLOUDFLARE_WORKER_HOST: true }

export const SITE = {
  title: 'DNS.Surf',
  tagline: 'Querying DNS Resolution Results in Different Regions Worldwide',
  description: 'Querying DNS Resolution Results in Different Regions Worldwide. 1. Supporting DNS Queries from 18 Regions 2.Supporting 100+ DNS Resolvers 3. 100% Run on Vercel',
  keywords: 'DNS.Surf, DNS resolution, DNS query regions, global DNS resolver, Vercel DNS, DNS exploration, DNS technology, DNS services',
  image: 'https://dns.surf/banner.png',
  url: 'https://dns.surf'
}

export const VERCEL_REGIONS = {
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

export const CLOUDFLARE_REGIONS = {
  // Oceania
  au1: {
    provider: 'cloudflare',
    ip: '8.24.243.2',
  },
  nz1: {
    provider: 'cloudflare',
    ip: '8.39.204.6',
  },

  // Asia
  id1: {
    provider: 'cloudflare',
    ip: '8.18.195.6',
  },
  sg1: {
    provider: 'cloudflare',
    ip: '8.25.96.66',
  },
  tr1: {
    provider: 'cloudflare',
    ip: '8.39.214.56',
  },
  bt1: {
    provider: 'cloudflare',
    ip: '8.20.124.8',
  },
  // hk1: {
  //   provider: 'cloudflare',
  //   ip: '8.20.100.1',
  // },
  in1: {
    provider: 'cloudflare',
    ip: '8.28.213.66',
  },
  jp1: {
    provider: 'cloudflare',
    ip: '8.34.201.6',
  },
  kr1: {
    provider: 'cloudflare',
    ip: '8.38.149.88',
  },
  my1: {
    provider: 'cloudflare',
    ip: '8.39.125.88',
  },
  tw1: {
    provider: 'cloudflare',
    ip: '8.39.126.66',
  },

  // Europe
  ee1: {
    provider: 'cloudflare',
    ip: '8.39.205.6',
  },
  gr1: {
    provider: 'cloudflare',
    ip: '8.17.205.11',
  },
  ie1: {
    provider: 'cloudflare',
    ip: '8.18.194.11',
  },
  it1: {
    provider: 'cloudflare',
    ip: '8.21.9.6',
  },
  ro1: {
    provider: 'cloudflare',
    ip: '8.43.226.101',
  },
  se1: {
    provider: 'cloudflare',
    ip: '8.14.199.66',
  },
  be1: {
    provider: 'cloudflare',
    ip: '8.44.2.66',
  },
  de1: {
    provider: 'cloudflare',
    ip: '8.43.121.11',
  },
  gb1: {
    provider: 'cloudflare',
    ip: '8.42.172.66',
  },
  hr1: {
    provider: 'cloudflare',
    ip: '8.39.6.6',
  },
  hu1: {
    provider: 'cloudflare',
    ip: '8.43.225.66',
  },
  dk1: {
    provider: 'cloudflare',
    ip: '8.43.224.111',
  },
  lv1: {
    provider: 'cloudflare',
    ip: '8.40.29.22',
  },
  nl1: {
    provider: 'cloudflare',
    ip: '8.19.8.66',
  },
  sk1: {
    provider: 'cloudflare',
    ip: '8.19.8.6',
  },
  fr1: {
    provider: 'cloudflare',
    ip: '8.36.219.66',
  },
  lu1: {
    provider: 'cloudflare',
    ip: '8.42.164.22',
  },
  pl1: {
    provider: 'cloudflare',
    ip: '8.40.107.77',
  },
  rs1: {
    provider: 'cloudflare',
    ip: '8.44.1.30',
  },
  at1: {
    provider: 'cloudflare',
    ip: '8.40.111.66',
  },
  is1: {
    provider: 'cloudflare',
    ip: '8.39.213.22',
  },
  pt1: {
    provider: 'cloudflare',
    ip: '8.42.245.88',
  },
  no1: {
    provider: 'cloudflare',
    ip: '8.41.36.66',
  },
  lt1: {
    provider: 'cloudflare',
    ip: '8.39.207.6',
  },
  bg1: {
    provider: 'cloudflare',
    ip: '8.40.26.50',
  },
  md1: {
    provider: 'cloudflare',
    ip: '8.39.206.16',
  },
  ua1: {
    provider: 'cloudflare',
    ip: '8.42.51.6',
  },
  cz1: {
    provider: 'cloudflare',
    ip: '8.40.30.6',
  },
  es1: {
    provider: 'cloudflare',
    ip: '8.44.3.44',
  },
  fi1: {
    provider: 'cloudflare',
    ip: '8.42.52.6',
  },

  // Africa
  za1: {
    provider: 'cloudflare',
    ip: '8.35.58.23',
  },
  ng1: {
    provider: 'cloudflare',
    ip: '8.35.57.22',
  },
  
  // South America
  pe1: {
    provider: 'cloudflare',
    ip: '8.36.220.66',
  },
  br1: {
    provider: 'cloudflare',
    ip: '8.18.113.166',
  },
  ar1: {
    provider: 'cloudflare',
    ip: '8.37.41.66',
  },
  cl1: {
    provider: 'cloudflare',
    ip: '8.36.218.88',
  },

  // North America
  ca1: {
    provider: 'cloudflare',
    ip: '8.46.117.6',
  },
  us1: {
    provider: 'cloudflare',
    ip: '8.47.9.6',
  },
  mx1: {
    provider: 'cloudflare',
    ip: '8.46.113.66',
  },
  
}

export const REGIONS = env.NEXT_PUBLIC_CLOUDFLARE_WORKER_HOST ? CLOUDFLARE_REGIONS : VERCEL_REGIONS
