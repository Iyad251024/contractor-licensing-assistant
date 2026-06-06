import type { Env } from "../types/billing";

export function r2(env: Env): R2Bucket {
  return env.DOCS;
}
