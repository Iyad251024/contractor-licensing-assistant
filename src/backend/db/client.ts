import type { Env } from "../types/billing";

export function db(env: Env): D1Database {
  return env.DB;
}
