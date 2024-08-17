# DNS.Surf

**查询 DNS 在全球各地的解析结果。**

---

[English](./README.md) | 简体中文

![DNS.Surf](./public/banner.png)

## 原理

Vercel 的 Edge 函数支持自定义部署区域，再通过 DoH 查询 DNS 记录就可以获取到 DNS 在全球各地的解析结果。

## 部署

1. [Fork](https://github.com/ccbikai/DNS.Surf/fork) 项目到你 GitHub
2. 在 Vercel 上创建一个新的项目
3. 选择 DNS.Surf 项目和 `Next.js` 框架
4. 保存并部署
5. 绑定域名（可选）

## 开发

前端:

```sh
pnpm install
pnpm run dev
```

后端:

```sh
pnpm install
pnpm run local
```

## 赞助

1. [在 𝕏 上关注我](https://x.com/ccbikai)
2. [在 GitHub 赞助我](https://github.com/sponsors/ccbikai)
