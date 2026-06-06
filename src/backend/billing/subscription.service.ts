import type { Env } from "../types/billing";
import type { PlanType, SubscriptionStatus } from "../types/user";
import { userRepo } from "../db/repositories/user.repo";

function statusFromStripe(s: string): SubscriptionStatus {
  switch (s) {
    case "active":
    case "trialing":
      return "active";
    case "past_due":
    case "unpaid":
      return "past_due";
    case "canceled":
    case "incomplete_expired":
      return "canceled";
    default:
      return "none";
  }
}

function planFromPriceId(env: Env, priceId: string): PlanType {
  if (priceId === env.STRIPE_PRICE_STARTER) return "starter";
  if (priceId === env.STRIPE_PRICE_PRO) return "pro";
  if (priceId === env.STRIPE_PRICE_BUSINESS) return "business";
  return "none";
}

export const subscriptionService = {
  async applySubscription(
    env: Env,
    userId: string,
    subscriptionId: string,
    status: string,
    priceId: string,
  ) {
    const plan = planFromPriceId(env, priceId);
    const mappedStatus = statusFromStripe(status);
    await userRepo.setSubscription(env.DB, userId, subscriptionId, mappedStatus, plan);
  },

  async cancelSubscription(env: Env, userId: string) {
    await userRepo.setSubscription(env.DB, userId, null, "canceled", "none");
  },
};
