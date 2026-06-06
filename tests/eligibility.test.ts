import { describe, it, expect } from "vitest";
import { evaluateEligibility } from "../src/backend/rules-engine/eligibility.engine";
import rules from "../docs/texas-electrical-rules.json";
import type { RulesDoc } from "../src/backend/rules-engine/types";

const R = rules as RulesDoc;

describe("evaluateEligibility (TX Electrical)", () => {
  it("passes for a fully qualified applicant", () => {
    const result = evaluateEligibility(R, {
      hasMasterElectrician: true,
      masterLicenseActive: true,
      hasBusinessEntity: true,
      liabilityCoverage: 500_000,
      hasFelonyConviction: false,
    });
    expect(result.eligible).toBe(true);
    expect(result.failures).toHaveLength(0);
  });

  it("fails when there is no master electrician", () => {
    const result = evaluateEligibility(R, {
      hasMasterElectrician: false,
      masterLicenseActive: false,
      hasBusinessEntity: true,
      liabilityCoverage: 500_000,
      hasFelonyConviction: false,
    });
    expect(result.eligible).toBe(false);
    expect(result.failures.some((f) => f.ruleId === "has_master_electrician")).toBe(true);
  });

  it("fails on insufficient insurance", () => {
    const result = evaluateEligibility(R, {
      hasMasterElectrician: true,
      masterLicenseActive: true,
      hasBusinessEntity: true,
      liabilityCoverage: 100_000,
      hasFelonyConviction: false,
    });
    expect(result.eligible).toBe(false);
    expect(result.failures.some((f) => f.ruleId === "insurance_minimum")).toBe(true);
  });

  it("warns on felony but stays eligible", () => {
    const result = evaluateEligibility(R, {
      hasMasterElectrician: true,
      masterLicenseActive: true,
      hasBusinessEntity: true,
      liabilityCoverage: 500_000,
      hasFelonyConviction: true,
    });
    expect(result.eligible).toBe(true);
    expect(result.warnings.some((w) => w.ruleId === "no_felony_block")).toBe(true);
  });
});
