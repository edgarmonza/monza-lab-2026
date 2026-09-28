/* Los íconos de «Lo que producimos» (los mismos del prototipo, caso.js). Trazo, sin relleno. */
import type { IconoEntregable } from "@/data/casos/tipos";

const TRAZOS: Record<IconoEntregable, JSX.Element> = {
  web: (<><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18" /><circle cx="6.5" cy="6.5" r=".6" fill="currentColor" /><circle cx="8.8" cy="6.5" r=".6" fill="currentColor" /></>),
  agente: (<><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" /></>),
  whatsapp: (<><path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.7z" /><path d="M9.5 9.2c.3 1.9 1.6 3.3 3.5 4l1.2-1.1 1.8.8-.4 1.6c-3.6.3-6.9-2.8-7-6.3l1.6-.4.8 1.8z" /></>),
  crm: (<><circle cx="9" cy="8.5" r="3" /><path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6s4.9 1.6 5.5 4.6" /><circle cx="17" cy="9.5" r="2.3" /><path d="M15.8 14.6c2.3-.3 4.2 1 4.8 3.7" /></>),
  contenido: (<><rect x="3" y="7" width="18" height="13" rx="2.5" /><path d="M8.5 7l1.4-2.5h4.2L15.5 7" /><circle cx="12" cy="13.5" r="3.4" /></>),
  pauta: (<><path d="M4 10v4l2.5.5L8 19h2.2l-.9-4 9.2 3V6L7 10z" /><path d="M20.5 10.5v3" /></>),
  plataforma: (<><rect x="3.5" y="3.5" width="7" height="7" rx="1.6" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.6" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.6" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.6" /></>),
  tablero: (<path d="M4 20V10M10 20V4M16 20v-8M21 20H3" />),
  correo: (<><rect x="3" y="5.5" width="18" height="13" rx="2.2" /><path d="M3.5 7l8.5 6 8.5-6" /></>),
  catalogo: (<><path d="M3.5 12.5l8-8H20v8.5l-8 8z" /><circle cx="16" cy="8" r="1.4" /></>),
  marca: (<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z" />),
  datos: (<><ellipse cx="12" cy="6" rx="7.5" ry="3" /><path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" /><path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" /></>),
};

export const IconoEntregableSvg = ({ icono }: { icono: IconoEntregable }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {TRAZOS[icono] ?? TRAZOS.agente}
  </svg>
);

/** El casco del logo, para el centro del mapa de tecnología. */
export const CascoMini = ({ casco = "#0B0B10", visor = "#F8B4D9" }: { casco?: string; visor?: string }) => (
  <svg viewBox="0 0 120 121" aria-hidden="true">
    <path d="M60 3C36 3 12 18 7 40C2 57 2 72 6 86L15 103C23 113 38 118 57 118L60 118L63 118C82 118 97 113 105 103L114 86C118 72 118 57 113 40C108 18 84 3 60 3Z" fill={casco} />
    <path d="M14 46C14 36 33 30 60 30C87 30 106 36 106 46L106 68C105 77 86 83 60 83C34 83 15 77 14 68Z" fill={visor} />
  </svg>
);

/** La chispa de los nodos de IA. */
export const Chispa = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.2 6.3L20.5 10l-6.3 2.2L12 18.5l-2.2-6.3L3.5 10l6.3-1.7z" fill="#0B0B10" /></svg>
);

export const FlechaAbajo = () => (
  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 3v8M3.5 7.5L7 11l3.5-3.5" /></svg>
);

export const IconoWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.2-.2-.5-.3Z" /></svg>
);
