# DNS.Surf

**Querying DNS Resolution Results in Different Regions Worldwide.**

![DNS.Surf](./public/banner.png)

---

English | [简体中文](./README.zh-cn.md)

## Demo

**Vercel** <https://vercel.dns.surf>

**Cloudflare** <https://cloudflare.dns.surf>

## How It Works

### Vercel

Vercel's Edge Functions support custom deployment regions. By querying DNS records through DoH, we can obtain global DNS resolution results. Theoretically supports 18 countries or regions.

### Cloudflare

Cloudflare Workers are deployed globally. By accessing Workers in specific regions and using DoH to query DNS records, we can obtain global DNS resolution results. Theoretically supports 120+ countries and 330+ cities.

## Deployment

Supports deployment to either Vercel or Cloudflare, independently.

### Deploy to Vercel

1. [Fork](https://github.com/ccbikai/DNS.Surf/fork) the project to your GitHub
2. Create a new project on Vercel
3. Select the DNS.Surf project and `Next.js` framework
4. Save and deploy
5. Bind a domain (optional)

### Deploy to Cloudflare

1. [Fork](https://github.com/ccbikai/DNS.Surf/fork) the project to your GitHub
2. Create a Worker locally using `npm run deploy -- --var "CORS_ORIGIN:dns.surf" "WORKER_HOST:dns.html.zone"`. Please modify the variable value: `$CORS_ORIGIN` to the domain name of your web page for cross-origin verification, and `$WORKER_HOST` to the access domain name of your Worker for source retrieval.
3. Link the Worker to GitHub in Cloudflare Dashboard and configure build script `npm run deploy -- --var "CORS_ORIGIN:dns.surf" "WORKER_HOST:dns.html.zone"`
4. Configure DNS resolution
   1. After copying the ENV file locally using `cp .env.example .env`
   2. Modify `WORKER_HOST` to the access domain of the Worker, `CLOUDFLARE_ZONE_ID` to the ID of the domain's ZONE, and `CLOUDFLARE_API_TOKEN` to the Cloudflare API Token, which needs permissions for 'reading user information', 'editing Workers', and 'editing DNS'
   3. Then use `npm run cf-dns` to configure DNS resolution.
5. Create a new Pages project on Cloudflare
6. Select the DNS.Surf project and `Next.js(static)` framework
7. Set environment variables and deploy
8. Bind a domain (optional)

## Development

### Vercel Version

```sh
pnpm install
pnpm run local
```

### Cloudflare Version

Backend:

```sh
cp .dev.vars.example dev.vars
# ↑ Modify WORKER_HOST to your Worker's access domain for remote access
pnpm install
pnpm run worker
```

Frontend:

```sh
cp .env.example .env
# ↑ Modify NEXT_PUBLIC_CLOUDFLARE_WORKER_HOST to your Worker's URL for remote access
pnpm run dev
```

## Sponsorship

1. [Follow me on 𝕏](https://404.li/kai)
2. [Sponsor me on GitHub](https://github.com/sponsors/ccbikai)
