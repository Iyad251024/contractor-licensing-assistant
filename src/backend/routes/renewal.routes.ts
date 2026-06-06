import { Hono } from "hono";
import type { Env } from "../types/billing";
import type { AuthVars } from "../middleware/auth.middleware";
import { requireAuth } from "../middleware/auth.middleware";
import { requirePlan } from "../middleware/subscription.middleware";
import { renewalService } from "../services/renewal.service";
import { z } from "zod";

export const renewalRoutes = new Hono<{ Bindings: Env; Variables: AuthVars }>();

renewalRoutes.use("*", requireAuth, requirePlan("renewal"));

renewalRoutes.get("/", async (c) => {
  const status = await renewalService.status(c.env.DB, c.get("user").id);
  return c.json({ renewal: status });
});

renewalRoutes.post("/mark-renewed", async (c) => {
  const { newExpiry } = z
    .object({ newExpiry: z.string() })
    .parse(await c.req.json());
  await renewalService.markRenewed(c.env.DB, c.get("user").id, newExpiry);
  return c.json({ ok: true });
});
