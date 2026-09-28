/* El final de Sessions: las preguntas directas y el cierre rosa (WhatsApp, correo, los tres pasos
 * y el formulario de contacto de siempre, dentro de una tarjeta oscura). */
import { Link } from "react-router-dom";
import type { Lang } from "@/i18n/types";
import { enlace } from "@/lib/enlace";
import { trackContact, whatsAppUrl } from "@/lib/pixel";
import LeadForm from "@/components/LeadForm";
import { CIERRE, PREGUNTAS } from "./datos";
import { IconoWhatsApp } from "./comun";

export const Preguntas = ({ L }: { L: Lang }) => (
  <section aria-labelledby="ss-faq">
    <span className="eyebrow rv">{PREGUNTAS.eyebrow[L]}</span>
    <h2 id="ss-faq" className="rv">{PREGUNTAS.titulo[L]}</h2>
    <div className="ss-faq rv">
      {PREGUNTAS.items.map((p, i) => {
        const partes = p.enlace?.partes[L];
        return (
          <details key={i}>
            <summary>{p.q[L]} <i aria-hidden="true">+</i></summary>
            {partes && p.enlace ? (
              <p>{partes[0]}<Link to={enlace(L, p.enlace.href)}>{partes[1]}</Link>{partes[2]}</p>
            ) : (
              <p>{p.a[L]}</p>
            )}
          </details>
        );
      })}
    </div>
  </section>
);

export const CierreSessions = ({ L }: { L: Lang }) => {
  const [antes, resaltado] = CIERRE.titulo[L];
  return (
    <section className="ss-cierre rosa grano" id="empezar" aria-labelledby="ss-empezar">
      <div className="ss-ciin">
        <span className="eyebrow rv">{CIERRE.eyebrow[L]}</span>
        <h2 id="ss-empezar" className="rv">{antes}<span className="box">{resaltado}</span></h2>
        <p className="lede rv">{CIERRE.lede[L]}</p>
        <div className="ss-ciacts rv">
          <a
            className="btn dark"
            href={whatsAppUrl(CIERRE.wa[L])}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact("whatsapp", "sessions_cierre")}
          >
            <IconoWhatsApp />{CIERRE.boton[L]}
          </a>
          <a className="lnk" href="mailto:edgar@monzalab.com?subject=Monza%20Sessions" onClick={() => trackContact("email", "sessions_cierre")}>
            edgar@monzalab.com
          </a>
        </div>
        <ol className="ss-cipasos">
          {CIERRE.pasos[L].map((p, i) => (
            <li className="rv" key={i}><b>{CIERRE.paso[L]} {i + 1}</b>{p}</li>
          ))}
        </ol>
        <div className="ss-form rv" id="lead-form">
          <h3>{CIERRE.formulario[L]}</h3>
          <LeadForm source="sessions_landing" />
        </div>
      </div>
      <div className="ss-cimarca" aria-hidden="true">Sessions</div>
    </section>
  );
};
