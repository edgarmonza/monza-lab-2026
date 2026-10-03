import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Casco } from "@/components/v2/NavbarV2";
import RadiografiaForm from "@/components/shopify/RadiografiaForm";
import { RX } from "@/components/shopify/radiografia-copy";
import { useLanguage } from "@/i18n/LanguageContext";
import { enlace } from "@/lib/enlace";
import { trackCta } from "@/lib/pixel";
import "@/components/shopify/radiografia-landing.css";

const ShopifyRadiografia = () => {
  const { language: lang, setLanguage } = useLanguage();
  const request = () => {
    trackCta("radiografia", "florida_landing");
    document.getElementById("radiografia")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return <div className="rx-landing v2">
    <SEO title={RX.title} description={RX.sub} path="/shopify/radiografia" ogKey="shopify" />
    <header className="rx-nav v2-chrome">
      <Link className="mlogo" to={enlace(lang, "/")} aria-label="Monza Lab">M<Casco />NZA</Link>
      <select aria-label="Language / Idioma" value={lang} onChange={e => setLanguage(e.target.value as typeof lang)}>
        <option value="es">ES</option><option value="en">EN</option><option value="de">DE</option><option value="pt">PT</option>
      </select>
    </header>
    <main id="main">
      <section className="rx-hero">
        <div className="rx-pitch">
          <p className="rx-eyebrow">{RX.eyebrow[lang]}</p>
          <h1>{RX.heading[lang]}<br/><span>{RX.accent[lang]}</span></h1>
          <p className="rx-sub">{RX.sub[lang]}</p>
          <button className="rx-primary" onClick={request}>{RX.cta[lang]} <span aria-hidden="true">↗</span></button>
          <p className="rx-terms">{RX.terms[lang]}</p>
        </div>
        <RadiografiaForm compact />
      </section>
      <section className="rx-proof">
        <div><p className="rx-eyebrow">MONZA LAB · SHOPIFY</p><h2>{RX.proofTitle[lang]}</h2><p>{RX.proof[lang]}</p><Link to={enlace(lang,"/work/eleonora-morales")}>{RX.caseLink[lang]} ↗</Link></div>
        <img src="/images/shopify/vitrina-desktop.webp" width="1440" height="1000" loading="lazy" alt="Eleonora Morales · Shopify" />
      </section>
      <section className="rx-includes"><h2>{RX.includes[lang]}</h2><ol>{RX.steps.map((step,i)=><li key={i}><span>0{i+1}</span><p>{step[lang]}</p></li>)}</ol><p className="rx-fit">{RX.fit[lang]}</p><button className="rx-primary" onClick={request}>{RX.cta[lang]} ↗</button></section>
    </main>
    <footer><span>© {new Date().getFullYear()} Monza Lab</span><Link to={enlace(lang,"/shopify")}>{RX.more[lang]}</Link><a href="/privacy.html">{RX.privacyLink[lang]}</a></footer>
  </div>;
};
export default ShopifyRadiografia;
