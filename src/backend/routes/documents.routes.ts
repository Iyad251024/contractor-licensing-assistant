import { Hono } from "hono";
import type { Env } from "../types/billing";
import type { AuthVars } from "../middleware/auth.middleware";
import { requireAuth } from "../middleware/auth.middleware";
import { requirePlan } from "../middleware/subscription.middleware";
import { documentService } from "../services/document.service";
import { Errors } from "../utils/errors";

export const documentRoutes = new Hono<{ Bindings: Env; Variables: AuthVars }>();

documentRoutes.use("*", requireAuth, requirePlan("documents"));

documentRoutes.post("/upload", async (c) => {
  const form = await c.req.formData();
  const file = form.get("file");
  const docType = String(form.get("docType") ?? "");
  const applicationId = form.get("applicationId") ? String(form.get("applicationId")) : null;
  if (!(file instanceof File)) throw Errors.badRequest("Missing file");
  if (!docType) throw Errors.badRequest("Missing docType");
  const body = await file.arrayBuffer();
  const doc = await documentService.upload(
    c.env.DOCS,
    c.env.DB,
    c.get("user").id,
    docType,
    file.name,
    file.type || "application/octet-stream",
    body,
    applicationId,
  );
  return c.json({ document: doc });
});

documentRoutes.get("/", async (c) => {
  const docs = await documentService.list(c.env.DB, c.get("user").id);
  return c.json({ documents: docs });
});

documentRoutes.get("/:id", async (c) => {
  const { doc, object } = await documentService.getDownloadStream(
    c.env.DOCS,
    c.env.DB,
    c.req.param("id"),
    c.get("user").id,
  );
  return new Response(object.body, {
    headers: {
      "Content-Type": doc.mime,
      "Content-Disposition": `attachment; filename="${doc.filename}"`,
    },
  });
});

documentRoutes.delete("/:id", async (c) => {
  await documentService.remove(c.env.DOCS, c.env.DB, c.req.param("id"), c.get("user").id);
  return c.json({ ok: true });
});
