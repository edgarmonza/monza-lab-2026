import type { AgentLang, UseCaseKey } from "./types";

export const WIDGET_COPY: Record<
  AgentLang,
  {
    greeting: string;
    placeholder: string;
    error: string;
    whatsappBtn: string;
    leadConfirmed: string;
    openLabel: string;
    closeLabel: string;
    sendLabel: string;
  }
> = {
  es: {
    greeting: "Cuéntame de tu negocio: qué vendes, dónde y qué te está costando plata hoy. Si me pasas tu web, la miro y te digo qué veo.",
    placeholder: "Escríbeme directo…",
    error: "Algo falló de mi lado. Sigue con Edgar por WhatsApp.",
    whatsappBtn: "Sigue por WhatsApp con Edgar",
    leadConfirmed: "Listo. Edgar te responde en menos de 24 horas.",
    openLabel: "Habla con el agente de Monza",
    closeLabel: "Cerrar",
    sendLabel: "Enviar",
  },
  en: {
    greeting: "Tell me about your business: what you sell, where, and what's costing you money today. Send me your website and I'll take a look and tell you what I see.",
    placeholder: "Message me directly…",
    error: "Something failed on my end. Continue with Edgar on WhatsApp.",
    whatsappBtn: "Continue on WhatsApp with Edgar",
    leadConfirmed: "Done. Edgar replies within 24 hours.",
    openLabel: "Talk to Monza's agent",
    closeLabel: "Close",
    sendLabel: "Send",
  },
  de: {
    greeting: "Erzähl mir von deinem Geschäft: was du verkaufst, wo, und was dich heute Geld kostet. Schick mir deine Website – ich schaue sie an und sage dir, was ich sehe.",
    placeholder: "Schreib mir direkt…",
    error: "Etwas ist schiefgelaufen. Mach mit Edgar auf WhatsApp weiter.",
    whatsappBtn: "Weiter auf WhatsApp mit Edgar",
    leadConfirmed: "Fertig. Edgar antwortet innerhalb von 24 Stunden.",
    openLabel: "Sprich mit Monzas Agent",
    closeLabel: "Schließen",
    sendLabel: "Senden",
  },
  pt: {
    greeting: "Conta-me do teu negócio: o que vendes, onde e o que te está a custar dinheiro hoje. Manda-me a tua web e digo-te o que vejo.",
    placeholder: "Escreve-me diretamente…",
    error: "Algo falhou do meu lado. Continua com o Edgar no WhatsApp.",
    whatsappBtn: "Continua no WhatsApp com o Edgar",
    leadConfirmed: "Pronto. O Edgar responde em menos de 24 horas.",
    openLabel: "Fala com o agente da Monza",
    closeLabel: "Fechar",
    sendLabel: "Enviar",
  },
};

export const CHIP_LABELS: Record<AgentLang, Record<UseCaseKey, string>> = {
  es: {
    ai_first: "Ser AI-first",
    ecommerce: "Marca de ropa → e-commerce",
    agents: "Agentes de IA",
    web: "Solo web",
    branding: "Branding",
    consulting: "Consultoría",
  },
  en: {
    ai_first: "Become AI-first",
    ecommerce: "Clothing brand → e-commerce",
    agents: "AI agents",
    web: "Just a website",
    branding: "Branding",
    consulting: "Consulting",
  },
  de: {
    ai_first: "AI-first werden",
    ecommerce: "Modemarke → E-Commerce",
    agents: "KI-Agenten",
    web: "Nur Website",
    branding: "Branding",
    consulting: "Beratung",
  },
  pt: {
    ai_first: "Ser AI-first",
    ecommerce: "Marca de roupa → e-commerce",
    agents: "Agentes de IA",
    web: "Só website",
    branding: "Branding",
    consulting: "Consultoria",
  },
};

export function chipSeed(key: UseCaseKey, lang: AgentLang): string {
  return CHIP_LABELS[lang][key];
}
