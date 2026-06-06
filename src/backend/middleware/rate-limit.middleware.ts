import type { MiddlewareHandler } from "hono";

// In-memory token-bucket per Worker isolate. For production-grade limits, swap
// to Cloudflare's Rate Limiting API or a Durable Object — this is the MVP guard.
const buckets = new Map<string, { tokens: number; updatedAt: number }>();

export function rateLimit(opts: { perMinute: number; key?: (c: any) => string }): MiddlewareHandler {
  const capacity = opts.perMinute;
  const refillPerMs = capacity / 60_000;
  return async (c, next) => {
    const key = opts.key
      ? opts.key(c)
      : (c.req.header("CF-Connecting-IP") ?? c.req.header("x-forwarded-for") ?? "anon");
    const now = Date.now();
    const b = buckets.get(key) ?? { tokens: capacity, updatedAt: now };
    b.tokens = Math.min(capacity, b.tokens + (now - b.updatedAt) * refillPerMs);
    b.updatedAt = now;
    if (b.tokens < 1) {
      return c.json({ error: "rate_limited", code: "rate_limited" }, 429);
    }
    b.tokens -= 1;
    buckets.set(key, b);
    await next();
  };
}
