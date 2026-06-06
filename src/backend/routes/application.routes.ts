import { Hono } from "hono";
import type { Env } from "../types/billing";
import type { AuthVars } from "../middleware/auth.middleware";
import { requireAuth } from "../middleware/auth.middleware";
import { requirePlan } from "../middleware/subscription.middleware";
import { applicationService } from "../services/application.service";
import { applicationRepo } from "../db/repositories/application.repo";
import { applicationPatchSchema } from "../utils/validators";
import { Errors } from "../utils/errors";

export const applicationRoutes = new Hono<{ Bindings: Env; Variables: AuthVars }>();

applicationRoutes.use("*", requireAuth, requirePlan("application"));

applicationRoutes.post("/", async (c) => {
  const app = await applicationService.getOrCreate(c.env.DB, c.get("user").id, c.env.JURISDICTION);
  return c.json({ application: app });
});

applicationRoutes.get("/", async (c) => {
  const app = await applicationService.get(c.env.DB, c.get("user").id);
  return c.json({ application: app });
});

applicationRoutes.patch("/:id", async (c) => {
  const body = applicationPatchSchema.parse(await c.req.json());
  const id = c.req.param("id");
  const app = await applicationRepo.findById(c.env.DB, id);
  if (!app || app.user_id !== c.get("user").id) throw Errors.notFound("Application not found");
  if (body.wizard_answers) {
    await applicationService.saveAnswers(c.env.DB, id, body.wizard_answers);
  }
  const patch: any = {};
  if (body.status) patch.status = body.status;
  if (body.license_number) patch.license_number = body.license_number;
  if (body.license_expires_at) patch.license_expires_at = body.license_expires_at;
  if (Object.keys(patch).length) await applicationRepo.update(c.env.DB, id, patch);
  return c.json({ application: await applicationRepo.findById(c.env.DB, id) });
});

applicationRoutes.post("/:id/submit", async (c) => {
  const app = await applicationService.submit(c.env.DB, c.req.param("id"), c.get("user").id);
  return c.json({ application: app });
});
