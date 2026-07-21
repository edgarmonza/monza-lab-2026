import { describe, it, expect } from "vitest";
import { PROJECTS } from "./projects";

describe("projects data", () => {
  it("todos tienen category", () => {
    for (const p of PROJECTS)
      expect(["platform", "venture", "studio"], p.slug).toContain(p.category);
  });

  it("hay 2 casos de plataforma confidenciales", () => {
    const platforms = PROJECTS.filter((p) => p.category === "platform");
    expect(platforms.map((p) => p.slug).sort()).toEqual([
      "plataforma-comercio-exterior",
      "plataforma-turismo",
    ]);
    for (const p of platforms) {
      expect(p.confidential, p.slug).toBe(true);
      expect(p.url, `${p.slug} confidencial no puede tener url`).toBeNull();
    }
  });

  it("slugs únicos", () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
