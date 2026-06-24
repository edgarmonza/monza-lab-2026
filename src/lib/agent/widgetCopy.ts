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
    greeting: "Cuéntame qué traes entre manos. ¿Por dónde vamos?",
    placeholder: "Escríbeme directo…",
    error: "Algo falló de mi lado. Sigue con Edgar por WhatsApp.",
    whatsappBtn: "Sigue por WhatsApp con Edgar",
    leadConfirmed: "Listo. Edgar te responde en menos de 24 horas.",
    openLabel: "Habla con el agente de Monza",
    closeLabel: "Cerrar",
    sendLabel: "Enviar",
  },
  en: {
    greeting: "Tell me what you're working on. Where do we start?",
    placeholder: "Message me directly…",
    error: "Something failed on my end. Continue with Edgar on WhatsApp.",
    whatsappBtn: "Continue on WhatsApp with Edgar",
    leadConfirmed: "Done. Edgar replies within 24 hours.",
    openLabel: "Talk to Monza's agent",
    closeLabel: "Close",
    sendLabel: "Send",
  },
  de: {
    greeting: "Erzähl mir, woran du arbeitest. Wo fangen wir an?",
    placeholder: "Schreib mir direkt…",
    error: "Etwas ist schiefgelaufen. Mach mit Edgar auf WhatsApp weiter.",
    whatsappBtn: "Weiter auf WhatsApp mit Edgar",
    leadConfirmed: "Fertig. Edgar antwortet innerhalb von 24 Stunden.",
    openLabel: "Sprich mit Monzas Agent",
    closeLabel: "Schließen",
    sendLabel: "Senden",
  },
  pt: {
    greeting: "Conta-me o que tens em mãos. Por onde começamos?",
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
