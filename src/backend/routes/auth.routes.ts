import { Hono } from "hono";
import type { Env } from "../types/billing";
import type { User } from "../types/user";
import { userRepo } from "../db/repositories/user.repo";
import { hashPassword, verifyPassword } from "../workers/auth.worker";
import { signToken, requireAuth, type AuthVars } from "../middleware/auth.middleware";
import { uuid, registerSchema, loginSchema } from "../utils/validators";
import { Errors } from "../utils/errors";

export const authRoutes = new Hono<{ Bindings: Env; Variables: AuthVars }>();

function publicUser(u: User) {
  const { password_hash, ...rest } = u;
  return rest;
}

authRoutes.post("/register", async (c) => {
  const body = registerSchema.parse(await c.req.json());
  const existing = await userRepo.findByEmail(c.env.DB, body.email);
  if (existing) throw Errors.conflict("Email already registered");
  const passwordHash = await hashPassword(body.password);
  const user = await userRepo.create(c.env.DB, {
    id: uuid(),
    email: body.email.toLowerCase(),
    password_hash: passwordHash,
    name: body.name,
    jurisdiction: c.env.JURISDICTION,
  });
  const token = await signToken(c.env, user.id);
  return c.json({ token, user: publicUser(user) });
});

authRoutes.post("/login", async (c) => {
  const body = loginSchema.parse(await c.req.json());
  const user = await userRepo.findByEmail(c.env.DB, body.email);
  if (!user) throw Errors.unauthorized();
  const ok = await verifyPassword(body.password, user.password_hash);
  if (!ok) throw Errors.unauthorized();
  const token = await signToken(c.env, user.id);
  return c.json({ token, user: publicUser(user) });
});

authRoutes.get("/me", requireAuth, async (c) => {
  return c.json({ user: publicUser(c.get("user")) });
});
