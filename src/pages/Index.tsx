import HeroHome from "@/components/HeroHome";
import ManifestoSection from "@/components/home/ManifestoSection";
import WorkShowcase from "@/components/WorkShowcase";
import MonzaStudioSection from "@/components/MonzaStudioSection";

import AboutEdgarSection from "@/components/AboutEdgarSection";
import MetodoMonzaSection from "@/components/MetodoMonzaSection";
import SpeakerTeaser from "@/components/SpeakerTeaser";
import FooterMinimal from "@/components/FooterMinimal";
import PremiumBackground from "@/components/layout/PremiumBackground";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <PremiumBackground>
      <SEO
        path=""
        title={{
          es: "Monza Lab — AI-Native Company Builder · E-commerce, Growth & IA",
          en: "Monza Lab — AI-Native Company Builder · E-commerce, Growth & AI",
          de: "Monza Lab — AI-Native Company Builder · E-Commerce, Growth & KI",
        }}
        description={{
          es: "Company builder AI-native. Construimos marcas de lujo con e-commerce Shopify, contenido con IA y growth multi-canal — de idea a marca global en semanas, no trimestres.",
          en: "AI-native company builder. We build luxury brands with Shopify e-commerce, AI-powered content and multi-channel growth — from idea to global brand in weeks, not quarters.",
          de: "AI-native Company Builder. Wir bauen Luxusmarken mit Shopify-E-Commerce, KI-gestütztem Content und Multi-Channel-Growth — von der Idee zur globalen Marke in Wochen, nicht in Quartalen.",
        }}
      />
      <main id="main" aria-label="Monza Lab — AI-Native Company Builder">
        <HeroHome />
        <ManifestoSection />
        <WorkShowcase />
        <MonzaStudioSection />
        <MetodoMonzaSection />
        <AboutEdgarSection />
        <SpeakerTeaser />
      </main>
      <FooterMinimal />
    </PremiumBackground>
  );
};

export default Index;
