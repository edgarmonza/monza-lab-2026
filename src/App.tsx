import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import { LanguageProvider } from "./i18n/LanguageContext";
import { ThemeProvider } from "./theme/ThemeContext";
import { Analytics } from "@vercel/analytics/react";

import Index from "./pages/Index";

/* Code-split — venture pages, speaker, project, upload load on demand.
   This shrinks the initial JS bundle so the home renders fast on mobile. */
const Speaker = lazy(() => import("./pages/Speaker"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Upload = lazy(() => import("./pages/Upload"));
const MonzaStudio = lazy(() => import("./pages/MonzaStudio"));
const StudioLanding = lazy(() => import("./pages/StudioLanding"));
const MonzaHaus = lazy(() => import("./pages/MonzaHaus"));
const MonzaIndex = lazy(() => import("./pages/MonzaIndex"));
const BavarianEcons = lazy(() => import("./pages/BavarianEcons"));
const MonzaSessions = lazy(() => import("./pages/MonzaSessions"));
import FloatingWhatsApp from "./components/FloatingWhatsApp";

const queryClient = new QueryClient();

/* Lightweight fallback while a route chunk loads — invisible spinner that
   doesn't flash; the premium background stays painted underneath. */
const RouteFallback = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    aria-hidden
  >
    <div
      className="w-2 h-2 rounded-full animate-pulse"
      style={{ background: "rgba(248,180,217,0.4)" }}
    />
  </div>
);

// Wrapper component to provide language context inside router
const AppContent = () => {
  const location = useLocation();
  const standalone = location.pathname === "/upload";

  return (
    <LanguageProvider>
      {!standalone && (
        <>
          {/* Skip link — WCAG 2.4.1 bypass blocks */}
          <a href="#main" className="skip-link">Skip to content</a>

          {/* ULTRA PREMIUM BACKGROUND - Fixed, theme-aware */}
          <div className="premium-black-bg" aria-hidden="true" />

          <CustomCursor />
          <ScrollToTop />
          <Navbar />
          <FloatingWhatsApp />
        </>
      )}
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* Standalone routes (no chrome) */}
          <Route path="/upload" element={<Upload />} />

          {/* Spanish routes (default - no prefix) */}
          <Route path="/" element={<Index />} />
          <Route path="/speaker" element={<Speaker />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/monzastudio" element={<MonzaStudio />} />
          <Route path="/studio" element={<StudioLanding />} />
          <Route path="/monzahaus" element={<MonzaHaus />} />
          <Route path="/monzaindex" element={<MonzaIndex />} />
          <Route path="/bavarianecons" element={<BavarianEcons />} />
          <Route path="/sessions" element={<MonzaSessions />} />

          {/* English routes (with /en prefix) */}
          <Route path="/en" element={<Index />} />
          <Route path="/en/speaker" element={<Speaker />} />
          <Route path="/en/work/:slug" element={<ProjectPage />} />
          <Route path="/en/monzastudio" element={<MonzaStudio />} />
          <Route path="/en/studio" element={<StudioLanding />} />
          <Route path="/en/monzahaus" element={<MonzaHaus />} />
          <Route path="/en/monzaindex" element={<MonzaIndex />} />
          <Route path="/en/bavarianecons" element={<BavarianEcons />} />
          <Route path="/en/sessions" element={<MonzaSessions />} />

          {/* German routes (with /de prefix) */}
          <Route path="/de" element={<Index />} />
          <Route path="/de/speaker" element={<Speaker />} />
          <Route path="/de/work/:slug" element={<ProjectPage />} />
          <Route path="/de/monzastudio" element={<MonzaStudio />} />
          <Route path="/de/studio" element={<StudioLanding />} />
          <Route path="/de/monzahaus" element={<MonzaHaus />} />
          <Route path="/de/monzaindex" element={<MonzaIndex />} />
          <Route path="/de/bavarianecons" element={<BavarianEcons />} />
          <Route path="/de/sessions" element={<MonzaSessions />} />

          {/* Portuguese routes (with /pt prefix) */}
          <Route path="/pt" element={<Index />} />
          <Route path="/pt/speaker" element={<Speaker />} />
          <Route path="/pt/work/:slug" element={<ProjectPage />} />
          <Route path="/pt/monzastudio" element={<MonzaStudio />} />
          <Route path="/pt/studio" element={<StudioLanding />} />
          <Route path="/pt/monzahaus" element={<MonzaHaus />} />
          <Route path="/pt/monzaindex" element={<MonzaIndex />} />
          <Route path="/pt/bavarianecons" element={<BavarianEcons />} />
          <Route path="/pt/sessions" element={<MonzaSessions />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </LanguageProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
        <Analytics />
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
