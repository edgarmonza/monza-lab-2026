import { describe, it, expect } from "vitest";
import { WIDGET_COPY, CHIP_LABELS, chipSeed } from "./widgetCopy";
import { USE_CASE_KEYS, type AgentLang } from "./types";

const LANGS: AgentLang[] = ["es", "en", "de", "pt"];

describe("widgetCopy", () => {
  it("tiene copy en los 4 idiomas", () => {
    for (const l of LANGS) {
      expect(WIDGET_COPY[l].greeting.length).toBeGreaterThan(0);
      expect(WIDGET_COPY[l].placeholder.length).toBeGreaterThan(0);
    }
  });

  it("tiene label de chip para cada caso en cada idioma", () => {
    for (const l of LANGS) {
      for (const k of USE_CASE_KEYS) {
        expect(CHIP_LABELS[l][k].length).toBeGreaterThan(0);
      }
    }
  });

  it("chipSeed devuelve una frase de arranque", () => {
    expect(chipSeed("agents", "es").length).toBeGreaterThan(0);
  });
});
