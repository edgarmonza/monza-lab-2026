// Primero: lee si esta visita llegó con el HTML prerenderizado (antes de cualquier navegación).
import { RUTA_PRERENDERIZADA } from "./lib/prerender";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { precargarRuta } from "./rutas";
import "./index.css";

const montar = () => createRoot(document.getElementById("root")!).render(<App />);

/* Con el HTML prerenderizado en pantalla, primero se baja el código de la página de esta ruta: si
 * React montara antes, la ruta perezosa pintaría el vacío de Suspense encima de la página que ya se
 * ve y la volvería a animar desde cero (auditoría móvil, 27-sep-2026). Si la precarga falla, se
 * monta igual. */
if (RUTA_PRERENDERIZADA) precargarRuta(RUTA_PRERENDERIZADA).catch(() => false).finally(montar);
else montar();
