/* El cierre de la portada: «Si te dio curiosidad, escríbeme.» con WhatsApp, correo y el agente,
 * y la marca M[casco]NZA gigante al pie (el casco entra rodando cuando se ve). */
import HelmetIcon from "@/components/HelmetIcon";
import { useLanguage } from "@/i18n/LanguageContext";
import { trackContact, whatsAppUrl } from "@/lib/pixel";
import { CIERRE } from "./textos";

const ICONO_WA = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.2-.2-.5-.3Z" />
  </svg>
);

const Cierre = () => {
  const { language } = useLanguage();
  return (
    <section className="cierre" id="hablemos" aria-labelledby="s-hablemos">
      <div className="ci-in">
        <span className="eyebrow rv">{CIERRE.eyebrow[language]}</span>
        <h2 id="s-hablemos" className="rv">{CIERRE.titulo[language]}<span className="box rosa-box">{CIERRE.resaltado[language]}</span></h2>
        <p className="lede rv">{CIERRE.lede[language]}</p>
        <div className="ci-acts rv">
          <a
            className="btn"
            href={whatsAppUrl(CIERRE.mensaje[language])}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact("whatsapp", "home_cierre")}
          >
            {ICONO_WA}
            {CIERRE.whatsapp[language]}
          </a>
          <a className="lnk" href="mailto:edgar@monzalab.com" onClick={() => trackContact("email", "home_cierre")}>edgar@monzalab.com</a>
          <button className="lnk" type="button" onClick={() => window.dispatchEvent(new CustomEvent("monza:open-agent"))}>
            {CIERRE.agente[language]}
          </button>
        </div>
      </div>
      <div className="ci-marca rv" aria-hidden="true">
        M<HelmetIcon variant="solid" shellColor="#F8B4D9" visorColor="#0B0B10" />NZA
      </div>
    </section>
  );
};

export default Cierre;
