import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/* El repo es PÚBLICO. Estos términos jamás pueden aparecer en código ni assets.
 * El contexto interno (NO commiteado) vive en docs/internal/. */
const FORBIDDEN = [
  /trading\s*.?plus/i,
  /portimar/i,
  /\bvolta\b/i,
  /cayala/i,
  /\bayala\b/i,
  /karen\s+bula/i,
  /caetano/i,
  /tradingpluslatam/i,
];

const SCAN_DIRS = ["src", "api", "public"];
const TEXT_EXT = /\.(ts|tsx|css|html|json|txt|xml|svg|md)$/;

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

describe("confidencialidad (repo público)", () => {
  const files = SCAN_DIRS.flatMap((d) => walk(d));

  it("ningún filename contiene términos prohibidos", () => {
    for (const f of files) for (const re of FORBIDDEN) expect(f).not.toMatch(re);
  });

  it("ningún archivo de texto contiene términos prohibidos", () => {
    const scannable = files.filter(
      (f) => TEXT_EXT.test(f) && !f.endsWith("confidentiality.guard.test.ts"),
    );
    for (const f of scannable) {
      const content = readFileSync(f, "utf8");
      for (const re of FORBIDDEN) {
        expect(content, `${f} contiene término prohibido ${re}`).not.toMatch(re);
      }
    }
  });
});
