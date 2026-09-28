/* «Quién está detrás del casco»: Edgar con su nombre gigante, la foto con Ray-Ban, las credenciales
 * (KPMG · Forbes · Hoy EAFIT · 5 países) y el bloque de speaker con la tira de fotos en escenario. */
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { enlace } from "@/lib/enlace";
import { trackContact, whatsAppUrl } from "@/lib/pixel";
import { EDGAR, SPEAKER } from "./textos";

const Edgar = () => {
  const { language } = useLanguage();
  const fotos = [...SPEAKER.fotos, ...SPEAKER.fotos];

  return (
    <section className="edgar" id="edgar" aria-labelledby="s-edgar">
      <div className="ed-cab">
        <span className="eyebrow rv">{EDGAR.eyebrow[language]}</span>
        <h2 id="s-edgar" className="ed-nombre rv"><span>Edgar</span><span className="hueco">Navarro</span></h2>
      </div>

      <div className="ed-in">
        <div className="ed-fig rv">
          <span className="smoke s1" aria-hidden="true" />
          <span className="smoke s2" aria-hidden="true" />
          <div className="ed-ph">
            <img src="/v2/edgar/retrato-rayban.jpg" alt={EDGAR.alt[language]} width={864} height={1184} loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="rv">
          <p className="ed-role">{EDGAR.rol[language]}</p>
          <p className="ed-stmt">{EDGAR.frase[language]}</p>
          <p className="ed-bio">
            {EDGAR.bioA[language]}<b>Bavarian Econs</b>{EDGAR.bioY[language]}<b>MonzaHaus</b>.
          </p>
          <p className="ed-why"><b>{EDGAR.porque[language]}</b>{EDGAR.casco[language]}</p>
          <div className="ed-links">
            <Link className="fuerte" to={enlace(language, "/speaker")}>{EDGAR.escenario[language]}</Link>
            <a href="https://www.linkedin.com/in/edgarnavarrosoto/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/monza.lab" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>

      <div className="ed-cred">
        {EDGAR.credenciales.map((c) => (
          <div key={c.b.es} className="cred rv"><i>{c.k[language]}</i><b>{c.b[language]}</b><span>{c.s[language]}</span></div>
        ))}
      </div>

      <div className="ed-escena" id="speaker">
        <div className="sp-in">
          <div className="sp-copy rv">
            <span className="eyebrow">{SPEAKER.eyebrow[language]}</span>
            <h3 className="sp-titulo">{SPEAKER.titulo[language]}<span className="box rosa-box">{SPEAKER.resaltado[language]}</span></h3>
            <p className="sp-lede">{SPEAKER.lede[language]}</p>
            <div className="sp-dato"><b>{SPEAKER.cifra[language]}</b><span>{SPEAKER.cifraTexto[language]}</span></div>
            <div className="sp-acts">
              <a
                className="btn"
                href={whatsAppUrl(SPEAKER.mensaje[language])}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact("whatsapp", "home_speaker")}
              >
                {SPEAKER.invitar[language]}
              </a>
              <Link className="lnk" to={enlace(language, "/speaker")}>{SPEAKER.pagina[language]}</Link>
            </div>
          </div>
          <div className="sp-lentes">
            {SPEAKER.lentes.map((l) => (
              <article key={l.i.es} className="rv"><i>{l.i[language]}</i><b>{l.b[language]}</b><span>{l.s[language]}</span></article>
            ))}
          </div>
        </div>
        <div className="tira" aria-label={SPEAKER.fotosAria[language]} role="group">
          <div className="tira-in">
            {fotos.map((f, i) => (
              <figure key={`${f.src}-${i}`} className="foto" aria-hidden={i >= SPEAKER.fotos.length ? true : undefined}>
                <img src={f.src} alt={i >= SPEAKER.fotos.length ? "" : f.alt[language]} loading="lazy" decoding="async" />
                <figcaption>{f.pie[language]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Edgar;
