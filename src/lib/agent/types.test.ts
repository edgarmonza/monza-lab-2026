import { describe, it, expect } from "vitest";
import { USE_CASE_KEYS } from "./types";

describe("types", () => {
  it("expone los 6 casos de uso", () => {
    expect(USE_CASE_KEYS).toEqual([
      "ai_first",
      "ecommerce",
      "agents",
      "web",
      "branding",
      "consulting",
    ]);
  });
});
