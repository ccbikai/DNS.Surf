import { Hono } from "hono";
import { cors } from "hono/cors";
import doh from "../doh.json";
import { REGIONS } from "../config";
import { getWorkerLocation } from "./cloudflare";

type Bindings = {
  CORS_ORIGIN: string;
  WORKER_HOST: string;
};

const app = new Hono<{ Bindings: Bindings }>();

const defaultResolver = "cloudflare";
function getResolver(resolver: string) {
  let dohServer = doh.find((s: string[]) => s[0] === resolver);
  if (!dohServer) {
    dohServer = doh.find((s: string[]) => s[0] === defaultResolver) || [];
  }
  return dohServer;
}

app.use("*", async (c, next) => {
  const corsMiddlewareHandler = cors({
    origin: (origin: string) => {
      if (!origin) return "";
      const { hostname } = new URL(origin);
      return hostname.endsWith(c.env.CORS_ORIGIN) ? origin : "";
    },
    exposeHeaders: ["X-Country", "X-Location"],
  });
  return corsMiddlewareHandler(c, next);
});

app.get("*", async (c) => {
  const accept = c.req.header("accept") || "";
  const { search } = new URL(c.req.raw.url);
  const { resolver = defaultResolver, dns, region } = c.req.query();

  if (!dns) {
    return c.text("dns is required", 400);
  }

  const regionConfig = REGIONS[region as keyof typeof REGIONS];

  const requestByWorkerProxy =
    regionConfig &&
    "provider" in regionConfig &&
    regionConfig.provider === "cloudflare" &&
    !c.req.header("x-no-proxy");

  let dohServer = requestByWorkerProxy
    ? ['worker', `https://${c.env.WORKER_HOST}/dns-query`]
    : getResolver(resolver);
  const DNSapi = /application\/dns-message/.test(accept)
    ? `${dohServer[1]}?dns=${dns}`
    : `${dohServer[1]}${search}`;

  const res = requestByWorkerProxy
    ? await fetch(DNSapi, {
        headers: {
          accept: accept,
          "user-agent": c.req.header("User-Agent") || "",
          "x-no-proxy": "true",
        },
        // @ts-ignore
        cf: {
          resolveOverride: `${region}.${c.env.WORKER_HOST}`,
        },
      })
    : await fetch(DNSapi, {
        headers: {
          accept: accept,
          "user-agent": c.req.header("User-Agent") || "",
        },
      });

  let regionInfo: { country: string; location: string } = {
    country: "",
    location: "",
  };

  if (requestByWorkerProxy) {
    regionInfo = getWorkerLocation(res.headers.get("cf-ray") || "");
  }

  console.log("DNS query", DNSapi, regionInfo);
  return c.body(res.body, res.status, {
    ...Object.fromEntries(res.headers.entries()),
    "X-Country": regionInfo.country || "",
    "X-Location": regionInfo.location || "",
  });
});

export default app;
