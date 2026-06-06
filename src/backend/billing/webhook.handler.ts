import Stripe from "stripe";
import { stripeClient } from "./stripe.client";
import { subscriptionService } from "./subscription.service";
import { billingRepo } from "../db/repositories/billing.repo";
import { userRepo } from "../db/repositories/user.repo";
import { uuid } from "../utils/validators";
import { log } from "../utils/logger";
import type { Env } from "../types/billing";

export async function handleStripeWebhook(env: Env, signature: string, rawBody: string) {
  const stripe = stripeClient(env);
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (e: any) {
    log.warn("invalid_stripe_signature", { err: String(e?.message) });
    return { ok: false, status: 400, body: "invalid signature" };
  }

  const userId = await resolveUserId(env, event);
  const recorded = await billingRepo.recordEvent(
    env.DB,
    uuid(),
    event.id,
    event.type,
    userId,
    event,
  );
  if (!recorded) {
    log.info("duplicate_stripe_event", { id: event.id });
    return { ok: true, status: 200, body: "duplicate" };
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const s = event.data.object as Stripe.Checkout.Session;
      if (userId && s.subscription) {
        const sub = await stripe.subscriptions.retrieve(String(s.subscription));
        await subscriptionService.applySubscription(
          env,
          userId,
          sub.id,
          sub.status,
          sub.items.data[0]?.price.id ?? "",
        );
      }
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      if (userId) {
        await subscriptionService.applySubscription(
          env,
          userId,
          sub.id,
          sub.status,
          sub.items.data[0]?.price.id ?? "",
        );
      }
      break;
    }
    case "customer.subscription.deleted": {
      if (userId) await subscriptionService.cancelSubscription(env, userId);
      break;
    }
    default:
      log.info("stripe_event_unhandled", { type: event.type });
  }

  return { ok: true, status: 200, body: "ok" };
}

async function resolveUserId(env: Env, event: Stripe.Event): Promise<string | null> {
  const obj: any = event.data.object;
  const metaUserId = obj?.metadata?.user_id;
  if (metaUserId) return metaUserId;
  const customerId =
    typeof obj?.customer === "string" ? obj.customer : obj?.customer?.id ?? null;
  if (!customerId) return null;
  const user = await userRepo.findByStripeCustomer(env.DB, customerId);
  return user?.id ?? null;
}
