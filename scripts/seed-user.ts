/**
 * Insert a demo user into the local D1 database via wrangler.
 *
 * Usage:
 *   tsx scripts/seed-user.ts demo@example.com password123 "Demo Contractor"
 *
 * Requires `wrangler` CLI on PATH. Idempotent: re-running with the same email
 * is a no-op (relies on UNIQUE(email)).
 */
import { execSync } from "node:child_process";
import { webcrypto as crypto } from "node:crypto";

const [, , emailArg, pwArg, nameArg] = process.argv;
const email = (emailArg ?? "demo@example.com").toLowerCase();
const password = pwArg ?? "password123";
const name = nameArg ?? "Demo Contractor";

const ITERATIONS = 100_000;

async function hash(pw: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(pw),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: ITERATIONS },
    key,
    32 * 8,
  );
  const b64 = (b: Uint8Array) => Buffer.from(b).toString("base64");
  return `pbkdf2$${ITERATIONS}$${b64(salt)}$${b64(new Uint8Array(bits))}`;
}

const id = crypto.randomUUID();
const passwordHash = await hash(password);

const sql = `INSERT OR IGNORE INTO users (id, email, password_hash, name, jurisdiction)
VALUES ('${id}', '${email}', '${passwordHash}', '${name.replace(/'/g, "''")}', 'TX_ELECTRICAL');`;

execSync(
  `wrangler d1 execute contractor_licensing --local --command="${sql.replace(/"/g, '\\"')}"`,
  { stdio: "inherit" },
);

console.log(`Seeded user ${email} (id=${id})`);
