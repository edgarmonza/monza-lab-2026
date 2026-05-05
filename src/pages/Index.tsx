import HeroHome from "@/components/HeroHome";
import ManifestoSection from "@/components/home/ManifestoSection";
import VenturesGrid from "@/components/home/VenturesGrid";
import BrandsStrip from "@/components/home/BrandsStrip";
import OperationStrip from "@/components/home/OperationStrip";
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
        ogPage="home"
        title={{
          es: "Monza Lab — AI-Native Company Builder · 4 Ventures, 1 Founder",
          en: "Monza Lab — AI-Native Company Builder · 4 Ventures, 1 Founder",
          de: "Monza Lab — AI-Native Company Builder · 4 Ventures, 1 Founder",
          pt: "Monza Lab — AI-Native Company Builder · 4 Ventures, 1 Founder",
        }}
        description={{
          es: "Construyo y opero empresas globales con IA como palanca. Cuatro ventures activas — MonzaHaus, Monza Index, Monza Studio, Bavarian Econs — un solo founder, criterio editorial.",
          en: "I build and operate global companies with AI as leverage. Four active ventures — MonzaHaus, Monza Index, Monza Studio, Bavarian Econs — one founder, editorial criterion.",
          de: "Ich baue und betreibe globale Unternehmen mit KI als Hebel. Vier aktive Ventures — MonzaHaus, Monza Index, Monza Studio, Bavarian Econs — ein Founder, redaktionelles Urteil.",
          pt: "Construo e opero empresas globais com IA como alavanca. Quatro ventures activas — MonzaHaus, Monza Index, Monza Studio, Bavarian Econs — um founder, critério editorial.",
        }}
      />
      <main id="main" aria-label="Monza Lab — AI-Native Company Builder">
        <HeroHome />
        <ManifestoSection />
        <VenturesGrid />
        <BrandsStrip />
        <OperationStrip />
        <MetodoMonzaSection />
        <AboutEdgarSection />
        <SpeakerTeaser />
      </main>
      <FooterMinimal />
    </PremiumBackground>
  );
};

export default Index;
