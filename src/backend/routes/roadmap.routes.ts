import { Hono } from "hono";
import type { Env } from "../types/billing";
import type { AuthVars } from "../middleware/auth.middleware";
import { requireAuth } from "../middleware/auth.middleware";
import { requirePlan } from "../middleware/subscription.middleware";
import { roadmapService } from "../services/roadmap.service";
import { applicationRepo } from "../db/repositories/application.repo";
import { stepUpdateSchema } from "../utils/validators";
import { Errors } from "../utils/errors";

export const roadmapRoutes = new Hono<{ Bindings: Env; Variables: AuthVars }>();

roadmapRoutes.use("*", requireAuth, requirePlan("roadmap"));

roadmapRoutes.post("/generate", async (c) => {
  const { applicationId } = await c.req.json<{ applicationId: string }>();
  const user = c.get("user");
  const app = await applicationRepo.findById(c.env.DB, applicationId);
  if (!app || app.user_id !== user.id) throw Errors.notFound("Application not found");
  const steps = await roadmapService.generateForApplication(c.env.DB, applicationId);
  return c.json({ steps });
});

roadmapRoutes.get("/:applicationId", async (c) => {
  const id = c.req.param("applicationId");
  const user = c.get("user");
  const app = await applicationRepo.findById(c.env.DB, id);
  if (!app || app.user_id !== user.id) throw Errors.notFound("Application not found");
  const steps = await roadmapService.list(c.env.DB, id);
  return c.json({ steps });
});

roadmapRoutes.patch("/step/:id", async (c) => {
  const stepId = c.req.param("id");
  const { status } = stepUpdateSchema.parse(await c.req.json());
  const step = await applicationRepo.findStep(c.env.DB, stepId);
  if (!step) throw Errors.notFound("Step not found");
  const app = await applicationRepo.findById(c.env.DB, step.application_id);
  if (!app || app.user_id !== c.get("user").id) throw Errors.notFound("Step not found");
  await roadmapService.updateStepStatus(c.env.DB, stepId, status);
  return c.json({ ok: true });
});
