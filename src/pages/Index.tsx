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
        title={{
          es: "Monza Lab — AI-Native Company Builder · 4 Ventures, 1 Founder",
          en: "Monza Lab — AI-Native Company Builder · 4 Ventures, 1 Founder",
          de: "Monza Lab — AI-Native Company Builder · 4 Ventures, 1 Founder", pt: "Monza Lab — AI-Native Company Builder · 4 Ventures, 1 Founder",
        }}
        description={{
          es: "Monza Lab es un company builder AI-native. Cuatro ventures activas — MonzaHaus, Monza Index, Monza Studio, Bavarian Econs — construidas y operadas desde una misma operación.",
          en: "Monza Lab is an AI-native company builder. Four active ventures — MonzaHaus, Monza Index, Monza Studio, Bavarian Econs — built and operated from a single operation.",
          de: "Monza Lab ist ein AI-native Company Builder. Vier aktive Ventures — MonzaHaus, Monza Index, Monza Studio, Bavarian Econs — gebaut und betrieben aus einer Operation.", pt: "Monza Lab es un company builder AI-native. Cuatro ventures activas — MonzaHaus, Monza Index, Monza Studio, Bavarian Econs — construidas y operadas desde una misma operación.",
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
