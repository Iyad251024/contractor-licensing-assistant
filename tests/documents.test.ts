import { describe, it, expect } from "vitest";
import { documentService } from "../src/backend/services/document.service";

describe("documentService.validate", () => {
  it("accepts a PDF for master_electrician_license", () => {
    expect(() =>
      documentService.validate("master_electrician_license", "application/pdf", 1_000_000),
    ).not.toThrow();
  });

  it("rejects an oversized file", () => {
    expect(() =>
      documentService.validate("master_electrician_license", "application/pdf", 50_000_000),
    ).toThrow(/exceeds/i);
  });

  it("rejects unsupported mime", () => {
    expect(() =>
      documentService.validate("coi", "text/html", 1000),
    ).toThrow(/Unsupported/i);
  });

  it("accepts jpg for license types that allow images", () => {
    expect(() =>
      documentService.validate("master_electrician_license", "image/jpeg", 500_000),
    ).not.toThrow();
  });
});
