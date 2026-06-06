import { stripeClient } from "../billing/stripe.client";
import { userRepo } from "../db/repositories/user.repo";
import type { Env } from "../types/billing";
import type { PlanType } from "../types/user";
import { Errors } from "../utils/errors";

const PLAN_TO_PRICE: Record<Exclude<PlanType, "none">, keyof Env> = {
  starter: "STRIPE_PRICE_STARTER",
  pro: "STRIPE_PRICE_PRO",
  business: "STRIPE_PRICE_BUSINESS",
};

export const stripeService = {
  async createCheckoutSession(env: Env, userId: string, plan: Exclude<PlanType, "none">) {
    const stripe = stripeClient(env);
    const user = await userRepo.findById(env.DB, userId);
    if (!user) throw Errors.notFound("User not found");

    let customerId = user.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { user_id: user.id },
      });
      customerId = customer.id;
      await userRepo.setStripeCustomer(env.DB, user.id, customerId);
    }

    const priceId = env[PLAN_TO_PRICE[plan]] as string;
    if (!priceId) throw Errors.badRequest(`Stripe price not configured for plan ${plan}`);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${env.APP_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.APP_URL}/#pricing`,
      metadata: { user_id: user.id, plan },
      subscription_data: { metadata: { user_id: user.id, plan } },
    });

    return { url: session.url! };
  },

  async createPortalSession(env: Env, userId: string) {
    const stripe = stripeClient(env);
    const user = await userRepo.findById(env.DB, userId);
    if (!user?.stripe_customer_id) throw Errors.badRequest("No Stripe customer for user");
    const portal = await stripe.billingPortal.sessions.create({
      customer: user.stripe_customer_id,
      return_url: `${env.APP_URL}/dashboard`,
    });
    return { url: portal.url };
  },
};
