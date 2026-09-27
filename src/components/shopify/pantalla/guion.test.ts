import { describe, it, expect } from "vitest";
import { armarGuion, cuadroEn, cuadroQuieto, inicioCapitulo, tecleo, RITMO, type Escena } from "./guion";

const ESCENAS: Escena[] = [
  { tipo: "tienda", id: "soloio", url: "soloio.com" },
  { tipo: "tienda", id: "eleonora", url: "eleonoramorales.com" },
  { tipo: "tienda", id: "skinv", url: "skinv.com.co" },
  { tipo: "sistema", url: "monzalab.com", lineas: ["Crece tus ventas.", "Configura tu CRM.", "Crea agentes de WhatsApp."] },
  { tipo: "cierre", texto: "¿Y la tuya?" },
];
const guion = armarGuion(ESCENAS, RITMO);
const tramo = (i: number) => guion.tramos[i];

describe("tecleo", () => {
  it("es determinista y cada tecla llega después de la anterior", () => {
    const a = tecleo("eleonoramorales.com", 50);
    expect(a).toEqual(tecleo("eleonoramorales.com", 50));
    expect(a).toHaveLength(19);
    for (let i = 1; i < a.length; i++) expect(a[i]).toBeGreaterThan(a[i - 1]);
  });

  it("varía el ritmo como una persona, sin salirse de ±30 % (más la pausa del punto)", () => {
    const a = tecleo("configura", 50);
    const pasos = a.map((t, i) => (i === 0 ? t : t - a[i - 1]));
    for (const p of pasos) {
      expect(p).toBeGreaterThanOrEqual(35);
      expect(p).toBeLessThanOrEqual(65);
    }
    expect(new Set(pasos.map(Math.round)).size).toBeGreaterThan(3);
    const conPunto = tecleo("a.b", 50);
    expect(conPunto[2] - conPunto[1]).toBeGreaterThan(65);
  });
});

describe("armarGuion", () => {
  it("encadena las escenas sin huecos y el total es la suma", () => {
    expect(tramo(0).inicio).toBe(0);
    for (let i = 1; i < guion.tramos.length; i++) expect(tramo(i).inicio).toBe(tramo(i - 1).fin);
    expect(guion.total).toBe(tramo(guion.tramos.length - 1).fin);
  });

  it("la primera tienda aparece antes de 1,2 s: es el momento que mide el LCP", () => {
    expect(tramo(0).marcas.aparece).toBeLessThan(1200);
  });

  it("dura entre 18 y 32 segundos: da para ver todo sin que el bucle canse", () => {
    expect(guion.total).toBeGreaterThan(18000);
    expect(guion.total).toBeLessThan(32000);
  });
});

describe("cuadroEn · las tiendas", () => {
  it("arranca con la barra vacía y la ventana en blanco", () => {
    const c = cuadroEn(guion, 0);
    expect(c.barra.texto).toBe("");
    expect(c.pagina).toBeNull();
    expect(c.fondo).toBeNull();
    expect(c.capitulo).toBe(0);
  });

  it("escribe la dirección letra por letra", () => {
    const m = tramo(0).marcas;
    const c = cuadroEn(guion, (m.escribe + m.escrito) / 2);
    expect("soloio.com".startsWith(c.barra.texto)).toBe(true);
    expect(c.barra.texto.length).toBeGreaterThan(0);
    expect(c.barra.texto.length).toBeLessThan("soloio.com".length);
    expect(c.barra.escribiendo).toBe(true);
  });

  it("después del enter carga con barra de progreso y la página aparece al final de la carga", () => {
    const m = tramo(0).marcas;
    const cargando = cuadroEn(guion, m.carga + 20);
    expect(cargando.barra.texto).toBe("soloio.com");
    expect(cargando.carga).not.toBeNull();
    expect(cargando.pestana).toEqual({ id: "soloio", cargando: true });
    const cargada = cuadroEn(guion, m.portada + 10);
    expect(cargada.carga).toBeNull();
    expect(cargada.pagina).toMatchObject({ id: "soloio", opacidad: 1, bajada: 0 });
    expect(cargada.pestana).toEqual({ id: "soloio", cargando: false });
  });

  it("baja la página suave y termina abajo del todo", () => {
    const m = tramo(0).marcas;
    const muestras = [m.baja, m.baja + 300, m.baja + 900, m.bajado - 200, m.bajado].map((t) => cuadroEn(guion, t).pagina!.bajada);
    for (let i = 1; i < muestras.length; i++) expect(muestras[i]).toBeGreaterThanOrEqual(muestras[i - 1]);
    expect(muestras[0]).toBe(0);
    expect(muestras[muestras.length - 1]).toBe(1);
    expect(cuadroEn(guion, tramo(0).fin - 1).pagina!.bajada).toBe(1);
  });

  it("en la siguiente tienda primero selecciona la dirección vieja y deja la página anterior de fondo", () => {
    const m = tramo(1).marcas;
    const sel = cuadroEn(guion, tramo(1).inicio + 10);
    expect(sel.barra).toMatchObject({ texto: "soloio.com", seleccionado: true });
    expect(sel.pagina).toMatchObject({ id: "soloio", bajada: 1 });
    const escribiendo = cuadroEn(guion, (m.escribe + m.escrito) / 2);
    expect("eleonoramorales.com".startsWith(escribiendo.barra.texto)).toBe(true);
    expect(escribiendo.barra.seleccionado).toBe(false);
    const aparece = cuadroEn(guion, m.aparece + (m.portada - m.aparece) / 2);
    expect(aparece.fondo).toMatchObject({ id: "soloio", bajada: 1 });
    expect(aparece.pagina!.id).toBe("eleonora");
    expect(aparece.pagina!.opacidad).toBeGreaterThan(0);
    expect(aparece.pagina!.opacidad).toBeLessThan(1);
  });
});

describe("cuadroEn · el sistema y el cierre", () => {
  it("el sistema aparece cuando carga monzalab.com, con la barra en esa dirección", () => {
    const m = tramo(3).marcas;
    expect(cuadroEn(guion, m.carga - 1).sistema).toBeNull();
    const c = cuadroEn(guion, m.portada + 50);
    expect(c.barra.texto).toBe("monzalab.com");
    expect(c.pestana.id).toBe("monza");
    expect(c.sistema).not.toBeNull();
  });

  it("escribe las tres frases en orden y cada una enciende su sistema antes de la siguiente", () => {
    const m = tramo(3).marcas;
    const n = ["Crece tus ventas.", "Configura tu CRM.", "Crea agentes de WhatsApp."].map((l) => l.length);
    for (let k = 1; k < 3; k++) {
      const c = cuadroEn(guion, m[`linea${k}`] + 1);
      expect(c.sistema!.lineas[k - 1]).toEqual({ escrito: n[k - 1], chips: 1 });
      expect(c.sistema!.lineas[k].escrito).toBeLessThanOrEqual(1);
    }
    const fin = cuadroEn(guion, tramo(3).fin - 1);
    expect(fin.sistema!.lineas).toEqual(n.map((escrito) => ({ escrito, chips: 1 })));
  });

  it("el cierre escribe «¿Y la tuya?» y deja la barra vacía, esperando el link", () => {
    const fin = cuadroEn(guion, tramo(4).fin - 1);
    expect(fin.cierre).toEqual({ escrito: "¿Y la tuya?".length, foco: true });
    expect(fin.barra.texto).toBe("");
    expect(fin.sistema).not.toBeNull();
    expect(fin.capitulo).toBe(3);
  });

  it("al final del bucle el sistema se desvanece en vez de cortarse de golpe", () => {
    const m = tramo(4).marcas;
    expect(cuadroEn(guion, m.sale - 1).sistema!.visible).toBe(1);
    expect(cuadroEn(guion, tramo(4).fin - 1).sistema!.visible).toBeLessThan(0.05);
  });
});

describe("capítulos, bucle y versión quieta", () => {
  it("cada capítulo empieza donde dice y el sistema con el cierre son el cuarto", () => {
    for (let k = 0; k < 4; k++) expect(cuadroEn(guion, inicioCapitulo(guion, k)).capitulo).toBe(k);
    expect(inicioCapitulo(guion, 3)).toBe(tramo(3).inicio);
    expect(cuadroEn(guion, tramo(4).inicio + 10).capitulo).toBe(3);
  });

  it("el avance del capítulo va de 0 a 1", () => {
    expect(cuadroEn(guion, inicioCapitulo(guion, 1)).avanceCapitulo).toBe(0);
    const casi = cuadroEn(guion, inicioCapitulo(guion, 2) - 1).avanceCapitulo;
    expect(casi).toBeGreaterThan(0.99);
    expect(casi).toBeLessThanOrEqual(1);
  });

  it("vuelve a empezar: el cuadro de total + x es el mismo de x", () => {
    for (const x of [0, 1234, 9876, 20000]) expect(cuadroEn(guion, guion.total + x)).toEqual(cuadroEn(guion, x));
  });

  it("para quien pide menos movimiento: cada tienda quieta en su portada y el sistema completo", () => {
    const tienda = cuadroQuieto(guion, 1);
    expect(tienda.barra.texto).toBe("eleonoramorales.com");
    expect(tienda.carga).toBeNull();
    expect(tienda.fondo).toBeNull();
    expect(tienda.pagina).toEqual({ id: "eleonora", opacidad: 1, bajada: 0 });
    const sistema = cuadroQuieto(guion, 3);
    expect(sistema.sistema!.visible).toBe(1);
    expect(sistema.sistema!.lineas.every((l) => l.chips === 1)).toBe(true);
    expect(sistema.cierre).toEqual({ escrito: "¿Y la tuya?".length, foco: true });
  });
});
