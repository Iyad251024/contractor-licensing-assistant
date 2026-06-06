import type { MiddlewareHandler } from "hono";
import type { Env } from "../types/billing";
import { PLAN_FEATURES } from "../types/billing";
import type { PlanType, User } from "../types/user";
import { Errors } from "../utils/errors";

export function hasFeature(plan: PlanType, feature: string) {
  return PLAN_FEATURES[plan]?.includes(feature) ?? false;
}

export function requirePlan(
  feature: string,
): MiddlewareHandler<{ Bindings: Env; Variables: { user: User } }> {
  return async (c, next) => {
    const user = c.get("user");
    if (!user) throw Errors.unauthorized();
    if (user.subscription_status !== "active") {
      throw Errors.planRequired("active");
    }
    if (!hasFeature(user.plan_type, feature)) {
      const required = feature === "renewal" || feature === "multi_user" ? "business" : "pro";
      throw Errors.planRequired(required);
    }
    await next();
  };
}
