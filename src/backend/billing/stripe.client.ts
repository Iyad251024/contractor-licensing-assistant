import Stripe from "stripe";
import type { Env } from "../types/billing";

let cached: { key: string; client: Stripe } | null = null;

export function stripeClient(env: Env): Stripe {
  if (cached && cached.key === env.STRIPE_SECRET_KEY) return cached.client;
  const client = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-09-30.acacia",
    httpClient: Stripe.createFetchHttpClient(),
  });
  cached = { key: env.STRIPE_SECRET_KEY, client };
  return client;
}
