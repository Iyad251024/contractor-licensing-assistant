import { evalOperator } from "./evaluator";
import type { EligibilityResult, RulesDoc } from "./types";

export function evaluateEligibility(
  rules: RulesDoc,
  answers: Record<string, unknown>,
): EligibilityResult {
  const failures: EligibilityResult["failures"] = [];
  const warnings: EligibilityResult["warnings"] = [];

  for (const rule of rules.eligibility.rules) {
    const actual = answers[rule.field];
    const passed = evalOperator(actual, rule.operator, rule.value);
    if (passed) continue;

    const entry = { ruleId: rule.id, severity: rule.type, message: rule.failMessage };
    if (rule.type === "required") failures.push(entry);
    else warnings.push(entry);
  }

  return {
    eligible: failures.length === 0,
    failures,
    warnings,
    evaluatedAt: new Date().toISOString(),
  };
}
