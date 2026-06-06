/**
 * Lists the migrations that wrangler will apply, in order.
 * Useful sanity-check before running `wrangler d1 migrations apply`.
 */
import { readdirSync } from "node:fs";
import { resolve } from "node:path";

const dir = resolve("src/backend/db/migrations");
const files = readdirSync(dir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

console.log("Migrations (in apply order):");
for (const f of files) console.log(`  - ${f}`);
console.log(`\nTotal: ${files.length}`);
