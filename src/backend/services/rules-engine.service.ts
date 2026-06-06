import rulesJson from "../../../docs/texas-electrical-rules.json";
import type { RulesDoc } from "../rules-engine/types";

let cached: RulesDoc | null = null;

export function getRules(): RulesDoc {
  if (cached) return cached;
  cached = rulesJson as RulesDoc;
  return cached;
}
