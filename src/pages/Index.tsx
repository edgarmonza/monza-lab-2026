import HeroHome from "@/components/HeroHome";
import WorkShowcase from "@/components/WorkShowcase";
import CredibilityBand from "@/components/CredibilityBand";
import AboutEdgarSection from "@/components/AboutEdgarSection";
import MetodoMonzaSection from "@/components/MetodoMonzaSection";
import SpeakerTeaser from "@/components/SpeakerTeaser";
import GlobalReel from "@/components/GlobalReel";
import VideoStatement from "@/components/VideoStatement";
import FooterMinimal from "@/components/FooterMinimal";
import PremiumBackground from "@/components/layout/PremiumBackground";

const Index = () => {
  return (
    <PremiumBackground>
      <HeroHome />
      <WorkShowcase />
      <CredibilityBand />
      <AboutEdgarSection />
      <MetodoMonzaSection />
      <SpeakerTeaser />
      <GlobalReel />
      <VideoStatement />
      <FooterMinimal />
    </PremiumBackground>
  );
};

export default Index;
