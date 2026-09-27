import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/* SEO del sitio completo (27-sep-2026).
 *
 * 1. El sitio se sirve en www.monzalab.com: el dominio sin www redirige ahí y Search
 *    Console está en www. Una canónica que apunta a una URL que redirige le da a Google
 *    dos señales contradictorias, así que toda URL absoluta va con www.
 *
 * 2. index.html trae las etiquetas SEO de la portada como respaldo para las rutas que no
 *    se prerenderizan. react-helmet solo reemplaza las etiquetas marcadas con
 *    data-react-helmet: sin la marca, cada página salía con DOS canónicas (la primera,
 *    la de la portada), dos descripciones y los hreflang de la portada. */

const APEX = /https?:\/\/monzalab\.com/;
const SCAN_DIRS = ["src", "api", "public"];
const TEXT_EXT = /\.(ts|tsx|html|json|txt|xml|md)$/;

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

describe("SEO: una sola versión del dominio", () => {
  it("ninguna URL absoluta apunta al dominio sin www", () => {
    const files = [
      "index.html",
      ...SCAN_DIRS.flatMap((d) => walk(d)).filter((f) => TEXT_EXT.test(f) && !f.endsWith("seo.guard.test.ts")),
    ];
    for (const f of files) expect(readFileSync(f, "utf8"), f).not.toMatch(APEX);
  });
});

describe("SEO: index.html no duplica las etiquetas de cada página", () => {
  const html = readFileSync("index.html", "utf8");
  const head = html.slice(0, html.indexOf("</head>"));
  const tags = head.match(/<(link|meta)\b[^>]*>/g) ?? [];
  const seoTags = tags.filter((t) =>
    /rel="(canonical|alternate)"|name="(description|robots|twitter:[^"]+)"|property="og:[^"]+"/.test(t),
  );

  it("conserva las etiquetas de respaldo de la portada", () => {
    expect(seoTags.some((t) => t.includes('rel="canonical"'))).toBe(true);
    expect(seoTags.some((t) => t.includes('name="description"'))).toBe(true);
  });

  it("todas llevan la marca de react-helmet para que cada página las reemplace", () => {
    for (const t of seoTags) expect(t, t).toContain('data-react-helmet="true"');
  });
});

describe("SEO: el alias de Vercel no compite con www", () => {
  // monza-lab-2026.vercel.app sirve el mismo sitio con 200: sin noindex, Google puede
  // indexar una copia entera de la web en otro dominio.
  it("vercel.json le pone noindex al alias de producción", () => {
    const cfg = JSON.parse(readFileSync("vercel.json", "utf8")) as {
      headers?: { has?: { type: string; value: string }[]; headers: { key: string; value: string }[] }[];
    };
    const regla = cfg.headers?.find((h) => h.has?.some((c) => c.type === "host" && c.value === "monza-lab-2026.vercel.app"));
    expect(regla?.headers).toContainEqual({ key: "X-Robots-Tag", value: "noindex" });
  });
});

describe("SEO: la entidad Monza Lab es una sola", () => {
  // Google arma el nombre del sitio y la ficha de la empresa con estos datos: la organización
  // tiene un @id al que apuntan el sitio y los servicios, y el perfil de LinkedIn es el real.
  const html = readFileSync("index.html", "utf8");
  const fichas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => {
    const d = JSON.parse(m[1]);
    return Array.isArray(d) ? d : [d];
  }) as Record<string, unknown>[];

  it("el sitio apunta a la organización", () => {
    const sitio = fichas.find((f) => f["@type"] === "WebSite") as { publisher?: { "@id": string }; url?: string } | undefined;
    expect(sitio?.url).toBe("https://www.monzalab.com");
    expect(sitio?.publisher?.["@id"]).toBe("https://www.monzalab.com/#organization");
  });

  it("el LinkedIn de Edgar es el mismo en todo el sitio", () => {
    expect(html).not.toMatch(/linkedin\.com\/in\/edgarnavarro["/]/);
    expect(html).toMatch(/linkedin\.com\/in\/edgarnavarrosoto\//);
  });
});
