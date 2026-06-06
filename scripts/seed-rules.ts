/**
 * Validate the Texas Electrical rules JSON against the rules-engine schema.
 * Run with: npm run seed
 *
 * The MVP loads rules from disk at request time (see services/rules-engine.service.ts),
 * so this script is a validity check rather than a DB insert.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const rulesPath = resolve("docs/texas-electrical-rules.json");
const raw = readFileSync(rulesPath, "utf8");
const rules = JSON.parse(raw);

function assert(cond: unknown, msg: string) {
  if (!cond) {
    console.error(`✗ ${msg}`);
    process.exit(1);
  }
  console.log(`✓ ${msg}`);
}

assert(rules.jurisdiction === "TX_ELECTRICAL", "jurisdiction is TX_ELECTRICAL");
assert(Array.isArray(rules.eligibility?.rules), "eligibility.rules is an array");
assert(rules.eligibility.rules.length > 0, "at least one eligibility rule");
assert(Array.isArray(rules.roadmap), "roadmap is an array");
assert(rules.roadmap.length > 0, "at least one roadmap step");
assert(Array.isArray(rules.requiredDocuments), "requiredDocuments is an array");
assert(typeof rules.fees?.application === "number", "fees.application is a number");

for (const rule of rules.eligibility.rules) {
  assert(rule.id && rule.field && rule.operator, `rule ${rule.id} has id/field/operator`);
}
for (const step of rules.roadmap) {
  assert(step.key && step.title && typeof step.order === "number", `step ${step.key} valid`);
}

console.log("\nRules file is valid.");
