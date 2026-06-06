import { Hono } from "hono";
import type { Env } from "../types/billing";
import type { AuthVars } from "../middleware/auth.middleware";
import { requireAuth } from "../middleware/auth.middleware";
import { requirePlan } from "../middleware/subscription.middleware";
import { checkEligibility } from "../services/eligibility.service";
import { applicationService } from "../services/application.service";
import { getRules } from "../services/rules-engine.service";
import { eligibilitySchema } from "../utils/validators";

export const eligibilityRoutes = new Hono<{ Bindings: Env; Variables: AuthVars }>();

eligibilityRoutes.get("/questions", (c) => c.json({ questions: getRules().wizardQuestions }));

eligibilityRoutes.post("/check", requireAuth, requirePlan("eligibility"), async (c) => {
  const { answers } = eligibilitySchema.parse(await c.req.json());
  const result = checkEligibility(answers);
  const user = c.get("user");
  const app = await applicationService.getOrCreate(c.env.DB, user.id, c.env.JURISDICTION);
  await applicationService.saveAnswers(c.env.DB, app.id, answers);
  return c.json({ result, applicationId: app.id });
});
