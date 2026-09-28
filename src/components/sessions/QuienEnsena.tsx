/* Quién lo enseña: el retrato con el casco, la bio y, abajo, las fotos en sala y en escenario
 * (en el celular se deslizan, con su barra de avance). */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import type { Lang } from "@/i18n/types";
import { enlace } from "@/lib/enlace";
import { EDGAR } from "./datos";

const QuienEnsena = ({ L }: { L: Lang }) => {
  const pista = useRef<HTMLDivElement>(null);
  const barra = useRef<HTMLElement>(null);
  const [antes, marca1, entre, marca2, despues] = EDGAR.bio[L];
  const [pregunta, respuesta] = EDGAR.casco[L];

  useEffect(() => {
    const tr = pista.current, th = barra.current;
    if (!tr || !th) return;
    const upd = () => {
      const max = tr.scrollWidth - tr.clientWidth;
      const f = Math.min(1, tr.clientWidth / Math.max(1, tr.scrollWidth));
      th.style.width = `${f * 100}%`;
      th.style.transform = `translateX(${max > 0 ? (tr.scrollLeft / max) * ((1 - f) / f) * 100 : 0}%)`;
    };
    tr.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    window.addEventListener("load", upd);
    upd();
    return () => { tr.removeEventListener("scroll", upd); window.removeEventListener("resize", upd); window.removeEventListener("load", upd); };
  }, []);

  return (
    <section className="ss-who" id="quien-ensena" aria-labelledby="ss-edgar">
      <div className="ss-whoghost" aria-hidden="true">MONZA</div>
      <div className="ss-whoin">
        <div className="ss-whofig rv">
          <span className="ss-smoke ss-s1" aria-hidden="true" />
          <span className="ss-smoke ss-s2" aria-hidden="true" />
          <div className="ss-whoph">
            <img src="/v2/sessions/edgar-casco.jpg" alt={EDGAR.retratoAlt[L]} width={1040} height={1300} loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="rv">
          <span className="eyebrow">{EDGAR.eyebrow[L]}</span>
          <h2 id="ss-edgar">Edgar Navarro</h2>
          <p className="ss-role">{EDGAR.rol}</p>
          <p className="ss-stmt">{EDGAR.frase[L]}</p>
          <p className="ss-bio">{antes}<b>{marca1}</b>{entre}<b>{marca2}</b>{despues}</p>
          <p className="ss-why"><b>{pregunta}</b>{respuesta}</p>
          <div className="ss-chips">
            {EDGAR.chips[L].map((c) => <span className="ss-chip" key={c}>{c}</span>)}
            <Link className="ss-chip" to={enlace(L, "/speaker")}>{EDGAR.escenario[L]}</Link>
          </div>
        </div>
      </div>

      <div className="ss-sala">
        <div className="ss-salahead rv">
          <h3>{EDGAR.salaTitulo[L]}</h3>
          <div className="ss-gremios" aria-label={EDGAR.gremiosAria[L]}>
            {EDGAR.gremios.map((g) => <span key={g}>{g}</span>)}
          </div>
        </div>
        <div className="ss-salatrack rv" ref={pista}>
          {EDGAR.fotos.map((f) => (
            <figure key={f.src}>
              <img src={f.src} alt={f.alt[L]} width={f.w} height={f.h} loading="lazy" decoding="async" />
              <figcaption>{f.pie[L]}</figcaption>
            </figure>
          ))}
        </div>
        <div className="ss-salafoot" aria-hidden="true">
          <div className="ss-salabar"><i ref={barra} /></div>
          <span className="ss-salahint">{EDGAR.desliza[L]}</span>
        </div>
      </div>
    </section>
  );
};

export default QuienEnsena;
