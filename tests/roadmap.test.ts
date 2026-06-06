import { describe, it, expect } from "vitest";
import { generateRoadmap, requiredDocuments } from "../src/backend/rules-engine/roadmap.generator";
import rules from "../docs/texas-electrical-rules.json";
import type { RulesDoc } from "../src/backend/rules-engine/types";

const R = rules as RulesDoc;

describe("generateRoadmap", () => {
  it("emits all steps when no skipIf matches", () => {
    const steps = generateRoadmap(R, {});
    expect(steps.length).toBe(R.roadmap.length);
    expect(steps[0].order_index).toBe(1);
  });

  it("skips entity formation when user already has one", () => {
    const steps = generateRoadmap(R, { hasBusinessEntity: true });
    expect(steps.find((s) => s.step_key === "form_business_entity")).toBeUndefined();
  });

  it("skips EIN step when user already has EIN", () => {
    const steps = generateRoadmap(R, { hasEin: true });
    expect(steps.find((s) => s.step_key === "obtain_ein")).toBeUndefined();
  });

  it("re-indexes order_index sequentially after skips", () => {
    const steps = generateRoadmap(R, { hasBusinessEntity: true, hasEin: true });
    steps.forEach((s, i) => expect(s.order_index).toBe(i + 1));
  });
});

describe("requiredDocuments", () => {
  it("includes DBA cert only when usesDba is true", () => {
    const withDba = requiredDocuments(R, { usesDba: true });
    const noDba = requiredDocuments(R, { usesDba: false });
    expect(withDba.find((d) => d.key === "assumed_name_cert")).toBeDefined();
    expect(noDba.find((d) => d.key === "assumed_name_cert")).toBeUndefined();
  });
});
