import { describe, it, expect } from "vitest";
import { VENTURES } from "./ventures";

const LANGS = ["es", "en", "de", "pt"] as const;

describe("ventures single source", () => {
  it("tiene las 4 ventures", () => {
    expect(VENTURES.map((v) => v.slug).sort()).toEqual(
      ["bavarianecons", "monzahaus", "monzaindex", "monzastudio"].sort(),
    );
  });
  it("todas las ventures tienen los 4 idiomas completos", () => {
    for (const v of VENTURES) {
      for (const lang of LANGS) {
        expect(v.tagline[lang], `${v.slug} tagline.${lang}`).toBeTruthy();
        expect(v.oneLiner[lang], `${v.slug} oneLiner.${lang}`).toBeTruthy();
        expect(v.navOneLiner[lang], `${v.slug} navOneLiner.${lang}`).toBeTruthy();
      }
    }
  });
});
