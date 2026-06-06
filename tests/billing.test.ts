import { describe, it, expect } from "vitest";
import { hasFeature } from "../src/backend/middleware/subscription.middleware";

describe("feature gating", () => {
  it("starter gets eligibility only", () => {
    expect(hasFeature("starter", "eligibility")).toBe(true);
    expect(hasFeature("starter", "roadmap")).toBe(false);
    expect(hasFeature("starter", "documents")).toBe(false);
  });

  it("pro gets roadmap + documents + application", () => {
    expect(hasFeature("pro", "roadmap")).toBe(true);
    expect(hasFeature("pro", "documents")).toBe(true);
    expect(hasFeature("pro", "application")).toBe(true);
    expect(hasFeature("pro", "renewal")).toBe(false);
  });

  it("business gets renewal + multi-user", () => {
    expect(hasFeature("business", "renewal")).toBe(true);
    expect(hasFeature("business", "multi_user")).toBe(true);
  });

  it("none has no features", () => {
    expect(hasFeature("none", "eligibility")).toBe(false);
  });
});
