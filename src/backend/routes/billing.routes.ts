import { Hono } from "hono";
import type { Env } from "../types/billing";
import type { AuthVars } from "../middleware/auth.middleware";
import { requireAuth } from "../middleware/auth.middleware";
import { stripeService } from "../services/stripe.service";
import { handleStripeWebhook } from "../billing/webhook.handler";
import { planSchema } from "../utils/validators";
import { Errors } from "../utils/errors";

export const billingRoutes = new Hono<{ Bindings: Env; Variables: AuthVars }>();

billingRoutes.post("/checkout", requireAuth, async (c) => {
  const { plan } = planSchema.parse(await c.req.json());
  const { url } = await stripeService.createCheckoutSession(c.env, c.get("user").id, plan);
  return c.json({ url });
});

billingRoutes.post("/portal", requireAuth, async (c) => {
  const { url } = await stripeService.createPortalSession(c.env, c.get("user").id);
  return c.json({ url });
});

billingRoutes.post("/webhook", async (c) => {
  const signature = c.req.header("stripe-signature");
  if (!signature) throw Errors.badRequest("Missing stripe-signature");
  const raw = await c.req.text();
  const result = await handleStripeWebhook(c.env, signature, raw);
  return c.body(result.body, result.status as any);
});
