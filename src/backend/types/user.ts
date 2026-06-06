export type PlanType = "none" | "starter" | "pro" | "business";
export type SubscriptionStatus = "none" | "active" | "past_due" | "canceled";

export interface User {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  jurisdiction: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  subscription_status: SubscriptionStatus;
  plan_type: PlanType;
  created_at: string;
}

export type PublicUser = Omit<User, "password_hash">;
