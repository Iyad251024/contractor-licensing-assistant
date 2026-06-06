import { jwtVerify, SignJWT } from "jose";
import type { MiddlewareHandler } from "hono";
import type { Env } from "../types/billing";
import type { User } from "../types/user";
import { userRepo } from "../db/repositories/user.repo";
import { Errors } from "../utils/errors";

const ALG = "HS256";

export async function signToken(env: Env, userId: string): Promise<string> {
  const secret = new TextEncoder().encode(env.JWT_SECRET);
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(env: Env, token: string): Promise<string> {
  const secret = new TextEncoder().encode(env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret, { algorithms: [ALG] });
  if (!payload.sub) throw new Error("missing sub");
  return payload.sub as string;
}

export type AuthVars = { user: User };

export const requireAuth: MiddlewareHandler<{ Bindings: Env; Variables: AuthVars }> = async (
  c,
  next,
) => {
  const header = c.req.header("Authorization");
  if (!header?.startsWith("Bearer ")) throw Errors.unauthorized();
  const token = header.slice(7);
  let userId: string;
  try {
    userId = await verifyToken(c.env, token);
  } catch {
    throw Errors.unauthorized();
  }
  const user = await userRepo.findById(c.env.DB, userId);
  if (!user) throw Errors.unauthorized();
  c.set("user", user);
  await next();
};
