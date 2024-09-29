# DNS.Surf

**Querying DNS Resolution Results in Different Regions Worldwide.**

---

English | [简体中文](./README.zh-cn.md)

![DNS.Surf](./public/banner.png)

## Principle

Vercel's Edge functions support custom deployment regions, and by querying DNS records through DoH, you can obtain the global resolution results of DNS.

## Deployment

1. [Fork](https://github.com/ccbikai/DNS.Surf/fork) the project to your GitHub
2. Create a new project on Vercel
3. Choose the DNS.Surf project and the `Next.js` framework
4. Save and deploy
5. Bind a domain name (optional)

## Development

Frontend:

```sh
pnpm install
pnpm run dev
```

Backend:

```sh
pnpm install
pnpm run local
```

## Sponsor

1. [Follow me on 𝕏](https://x.com/ccbikai)
2. [Sponsor me on GitHub](https://github.com/sponsors/ccbikai)
