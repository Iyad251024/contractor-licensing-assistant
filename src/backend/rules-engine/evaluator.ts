import type { RuleOperator } from "./types";

export function evalOperator(actual: unknown, op: RuleOperator, expected: unknown): boolean {
  switch (op) {
    case "equals":
      return actual === expected;
    case "neq":
      return actual !== expected;
    case "gte":
      return typeof actual === "number" && typeof expected === "number" && actual >= expected;
    case "lte":
      return typeof actual === "number" && typeof expected === "number" && actual <= expected;
    case "in":
      return Array.isArray(expected) && (expected as unknown[]).includes(actual);
    default:
      return false;
  }
}
