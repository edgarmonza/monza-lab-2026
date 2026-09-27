import { lazy, type ComponentType } from "react";

/* Una ruta perezosa que se puede precargar. React.lazy suspende siempre en su primer render,
 * aunque el módulo ya esté bajado; con el HTML prerenderizado en pantalla, ese suspenso pintaba la
 * página en blanco un instante (auditoría móvil, 27-sep-2026). Si el módulo se precargó antes del
 * primer render, se pinta directo, sin pasar por Suspense. */

export type Perezosa<P extends object> = ComponentType<P> & { precargar: () => Promise<void> };

export function perezosa<P extends object>(cargar: () => Promise<{ default: ComponentType<P> }>): Perezosa<P> {
  let Modulo: ComponentType<P> | null = null;
  const Diferida = lazy(cargar) as unknown as ComponentType<P>;
  const Ruta = ((props: P) => (Modulo ? <Modulo {...props} /> : <Diferida {...props} />)) as Perezosa<P>;
  Ruta.precargar = () =>
    cargar().then((m) => {
      Modulo = m.default;
    });
  return Ruta;
}
