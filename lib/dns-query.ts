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


  const regionConfig: { provider: string } = REGIONS[region as keyof typeof REGIONS];

  const requestFromWorker = c.req.header("X-Requested-With") === "worker"
  const requestByWorkerProxy = regionConfig?.provider === "cloudflare" && !requestFromWorker;

  let dohServer = requestByWorkerProxy
    ? ['worker', `https://${c.env.WORKER_HOST}/dns-query`]
    : getResolver(resolver);
  const DNSapi = /application\/dns-message/.test(accept) && !requestByWorkerProxy
    ? `${dohServer[1]}?dns=${dns}`
    : `${dohServer[1]}${search}`;

  console.log("DNS API", DNSapi);
  const res = requestByWorkerProxy
    ? await fetch(DNSapi, {
        headers: {
          accept: accept,
          "User-Agent": c.req.header("User-Agent") || "",
          "X-Requested-With": "worker",
        },
        // @ts-ignore
        cf: {
          resolveOverride: `${region}.${c.env.WORKER_HOST}`,
        },
      })
    : await fetch(DNSapi, {
        headers: {
          accept: accept,
          "User-Agent": c.req.header("User-Agent") || "",
        },
      });

  let regionInfo: { country: string; location: string } = {
    country: "",
    location: "",
  };

  if (requestFromWorker) {
    regionInfo = await getWorkerLocation();
    console.log("CF Worker RegionInfo", regionInfo);
  }

  return c.body(res.body, res.status, {
    ...Object.fromEntries(res.headers.entries()),
    "X-Country": res.headers.get("X-Country") || regionInfo.country || "",
    "X-Location": res.headers.get("X-Location") || regionInfo.location || "",
  });
});

export default app;
