import type { IconoEntregable as Clave } from "@/data/casos/tipos";

/* Los íconos de lo producido (web, agente, WhatsApp, CRM…), de trazo, en el color del texto. */
const TRAZOS: Record<Clave, JSX.Element> = {
  web: <><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M3 9h18" /></>,
  agente: <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />,
  whatsapp: <path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.7z" />,
  crm: <><circle cx="9" cy="8.5" r="3" /><path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6s4.9 1.6 5.5 4.6" /><circle cx="17" cy="9.5" r="2.3" /></>,
  contenido: <><rect x="3" y="7" width="18" height="13" rx="2.5" /><circle cx="12" cy="13.5" r="3.4" /></>,
  pauta: <path d="M4 10v4l2.5.5L8 19h2.2l-.9-4 9.2 3V6L7 10z" />,
  plataforma: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.6" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.6" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.6" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.6" /></>,
  tablero: <path d="M4 20V10M10 20V4M16 20v-8M21 20H3" />,
  correo: <><rect x="3" y="5.5" width="18" height="13" rx="2.2" /><path d="M3.5 7l8.5 6 8.5-6" /></>,
  catalogo: <path d="M3.5 12.5l8-8H20v8.5l-8 8z" />,
  marca: <path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z" />,
  datos: <><ellipse cx="12" cy="6" rx="7.5" ry="3" /><path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" /></>,
};

const IconoEntregable = ({ icono }: { icono: Clave }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {TRAZOS[icono]}
  </svg>
);

export default IconoEntregable;
