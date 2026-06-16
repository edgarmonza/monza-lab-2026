import { useLanguage } from "@/i18n/LanguageContext";
import { trackContact, whatsAppUrl } from "@/lib/pixel";

const MESSAGES = {
  es: "Hola Edgar, vengo de monzalab.com y quiero hablar sobre mi marca.",
  en: "Hi Edgar, I came from monzalab.com and I'd like to talk about my brand.",
  de: "Hallo Edgar, ich komme von monzalab.com und möchte über meine Marke sprechen.",
  pt: "Olá Edgar, venho de monzalab.com e gostaria de falar sobre a minha marca.",
} as const;

const LABELS = {
  es: "Escríbenos por WhatsApp",
  en: "Message us on WhatsApp",
  de: "Schreib uns auf WhatsApp",
  pt: "Fala connosco no WhatsApp",
} as const;

/* Floating WhatsApp button — fixed bottom-right, site-wide.
 * Direct line to Edgar; fires the Meta "Contact" event so paid traffic
 * that taps it counts as a conversion signal. */
const FloatingWhatsApp = () => {
  const { language } = useLanguage();

  return (
    <a
      href={whatsAppUrl(MESSAGES[language])}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={LABELS[language]}
      onClick={() => trackContact("whatsapp", "floating_button")}
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[60] group"
    >
      <span
        className="flex items-center justify-center w-13 h-13 md:w-14 md:h-14 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110"
        style={{
          width: 54,
          height: 54,
          background: "rgba(11,11,16,0.92)",
          border: "1px solid rgba(248,180,217,0.55)",
          boxShadow: "0 8px 28px rgba(248,180,217,0.40)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* WhatsApp glyph — en color Monza (pink) */}
        <svg viewBox="0 0 32 32" width="28" height="28" fill="#F8B4D9" aria-hidden="true">
          <path d="M16.04 4.5c-6.35 0-11.5 5.11-11.5 11.41 0 2.01.53 3.98 1.55 5.71L4.5 27.5l6.06-1.57a11.6 11.6 0 0 0 5.48 1.38h.01c6.34 0 11.5-5.11 11.5-11.4 0-3.05-1.2-5.92-3.37-8.07a11.5 11.5 0 0 0-8.14-3.34Zm0 20.87h-.01a9.66 9.66 0 0 1-4.9-1.34l-.35-.21-3.6.93.96-3.49-.23-.36a9.36 9.36 0 0 1-1.46-5c0-5.22 4.29-9.46 9.57-9.46 2.56 0 4.96.99 6.77 2.78a9.36 9.36 0 0 1 2.8 6.7c0 5.22-4.28 9.45-9.55 9.45Zm5.25-7.08c-.29-.14-1.7-.83-1.96-.93-.26-.1-.46-.14-.65.15-.19.28-.74.93-.9 1.12-.17.19-.34.21-.62.07-.29-.14-1.21-.44-2.3-1.41a8.6 8.6 0 0 1-1.6-1.96c-.16-.28-.02-.44.13-.58.13-.13.29-.33.43-.5.14-.17.19-.28.29-.47.1-.19.05-.36-.02-.5-.07-.14-.65-1.54-.88-2.11-.23-.55-.47-.48-.65-.49l-.55-.01c-.19 0-.5.07-.77.36-.26.28-1 .97-1 2.36 0 1.4 1.03 2.74 1.17 2.93.14.19 2.02 3.05 4.89 4.28.68.29 1.22.46 1.63.6.69.21 1.31.18 1.81.11.55-.08 1.7-.69 1.94-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.19-.55-.33Z" />
        </svg>
      </span>
    </a>
  );
};

export default FloatingWhatsApp;
