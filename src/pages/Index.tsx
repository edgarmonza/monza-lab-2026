import HeroHome from "@/components/HeroHome";
import ManifestoSection from "@/components/home/ManifestoSection";
import VenturesGrid from "@/components/home/VenturesGrid";
import PlatformsSection from "@/components/home/PlatformsSection";
import BrandsStrip from "@/components/home/BrandsStrip";
import OperationStrip from "@/components/home/OperationStrip";
import AboutEdgarSection from "@/components/AboutEdgarSection";
import MetodoMonzaSection from "@/components/MetodoMonzaSection";
import SpeakerTeaser from "@/components/SpeakerTeaser";
import CierreConversion from "@/components/home/CierreConversion";
import FooterMinimal from "@/components/FooterMinimal";
import PremiumBackground from "@/components/layout/PremiumBackground";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <PremiumBackground>
      <SEO
        path=""
        ogPage="home"
        title={{
          es: "Monza Lab — AI-Native Company Builder · Ventures y Plataformas AI-First",
          en: "Monza Lab — AI-Native Company Builder · Ventures & AI-First Platforms",
          de: "Monza Lab — AI-Native Company Builder · Ventures & AI-First-Plattformen",
          pt: "Monza Lab — AI-Native Company Builder · Ventures e Plataformas AI-First",
        }}
        description={{
          es: "Construyo y opero empresas globales con IA como palanca. Cuatro ventures propias y plataformas AI-first para clientes — comercio exterior, turismo — un solo founder, criterio editorial.",
          en: "I build and operate global companies with AI as leverage. Four ventures of our own and AI-first platforms for clients — foreign trade, travel — one founder, editorial criterion.",
          de: "Ich baue und betreibe globale Unternehmen mit KI als Hebel. Vier eigene Ventures und AI-First-Plattformen für Kunden — Außenhandel, Reisen — ein Founder, redaktionelles Urteil.",
          pt: "Construo e opero empresas globais com IA como alavanca. Quatro ventures próprias e plataformas AI-first para clientes — comércio exterior, viagens — um founder, critério editorial.",
        }}
      />
      <main id="main" aria-label="Monza Lab — AI-Native Company Builder">
        <HeroHome />
        <ManifestoSection />
        <VenturesGrid />
        <PlatformsSection />
        <BrandsStrip />
        <OperationStrip />
        <MetodoMonzaSection />
        <AboutEdgarSection />
        <SpeakerTeaser />
        <CierreConversion />
      </main>
      <FooterMinimal />
    </PremiumBackground>
  );
};

export default Index;
