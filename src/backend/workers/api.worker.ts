import { Hono } from "hono";
import { cors } from "hono/cors";
import { ZodError } from "zod";
import type { Env } from "../types/billing";
import type { AuthVars } from "../middleware/auth.middleware";
import { authRoutes } from "../routes/auth.routes";
import { eligibilityRoutes } from "../routes/eligibility.routes";
import { roadmapRoutes } from "../routes/roadmap.routes";
import { documentRoutes } from "../routes/documents.routes";
import { applicationRoutes } from "../routes/application.routes";
import { renewalRoutes } from "../routes/renewal.routes";
import { billingRoutes } from "../routes/billing.routes";
import { rateLimit } from "../middleware/rate-limit.middleware";
import { AppError } from "../utils/errors";
import { log } from "../utils/logger";

const app = new Hono<{ Bindings: Env; Variables: AuthVars }>();

app.use("*", cors({ origin: (o) => o, credentials: true }));
app.use("/api/*", rateLimit({ perMinute: 120 }));

app.get("/", (c) => c.json({ name: "contractor-licensing-api", status: "ok" }));
app.get("/healthz", (c) => c.json({ ok: true }));

app.route("/api/auth", authRoutes);
app.route("/api/eligibility", eligibilityRoutes);
app.route("/api/roadmap", roadmapRoutes);
app.route("/api/documents", documentRoutes);
app.route("/api/application", applicationRoutes);
app.route("/api/renewal", renewalRoutes);
app.route("/api/billing", billingRoutes);

app.onError((err, c) => {
  if (err instanceof AppError) {
    return c.json({ error: err.message, code: err.code }, err.status as any);
  }
  if (err instanceof ZodError) {
    return c.json({ error: "Validation failed", code: "validation", issues: err.issues }, 400);
  }
  log.error("unhandled", { err: String(err?.message ?? err) });
  return c.json({ error: "Internal error", code: "internal" }, 500);
});

app.notFound((c) => c.json({ error: "Not found", code: "not_found" }, 404));

export default app;
