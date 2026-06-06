import { evaluateEligibility } from "../rules-engine/eligibility.engine";
import { getRules } from "./rules-engine.service";

export function checkEligibility(answers: Record<string, unknown>) {
  return evaluateEligibility(getRules(), answers);
}
