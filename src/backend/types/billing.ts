import type { PlanType } from "./user";

export interface BillingEvent {
  id: string;
  user_id: string | null;
  stripe_event_id: string;
  event_type: string;
  payload: string;
  created_at: string;
}

export const PLAN_FEATURES: Record<PlanType, string[]> = {
  none: [],
  starter: ["eligibility"],
  pro: ["eligibility", "roadmap", "documents", "application"],
  business: ["eligibility", "roadmap", "documents", "application", "renewal", "multi_user"],
};

export interface Env {
  DB: D1Database;
  DOCS: R2Bucket;
  JWT_SECRET: string;
  APP_URL: string;
  JURISDICTION: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  STRIPE_PRICE_STARTER: string;
  STRIPE_PRICE_PRO: string;
  STRIPE_PRICE_BUSINESS: string;
}
