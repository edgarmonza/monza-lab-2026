import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import RouteAnalytics from "./components/RouteAnalytics";
import GoogleAnalytics from "./components/GoogleAnalytics";
import NavbarV2 from "./components/v2/NavbarV2";
import CursorCasco from "./components/v2/CursorCasco";
import { LanguageProvider } from "./i18n/LanguageContext";
import { ThemeProvider } from "./theme/ThemeContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Index from "./pages/Index";

/* Las páginas que se bajan cuando se necesitan viven en rutas.tsx, precargables (ver main.tsx). */
import {
  Speaker,
  NotFound,
  Upload,
  MonzaSessions,
  Work,
  ShopifyVertical,
  CasoRuta,
  Plataformas,
} from "./rutas";
import MonzaAgent from "./components/MonzaAgent";

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
      <RouteAnalytics />
      {!standalone && (
        <>
          {/* Skip link — WCAG 2.4.1 bypass blocks */}
          <a href="#main" className="skip-link">Skip to content</a>

          {/* ULTRA PREMIUM BACKGROUND - Fixed, theme-aware */}
          <div className="premium-black-bg" aria-hidden="true" />

          <CursorCasco />
          <ScrollToTop />
          <NavbarV2 />
          <MonzaAgent />
        </>
      )}
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* Standalone routes (no chrome) */}
          <Route path="/upload" element={<Upload />} />

          {/* Spanish routes (default - no prefix) */}
          <Route path="/" element={<Index />} />
          <Route path="/speaker" element={<Speaker />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<CasoRuta />} />
          <Route path="/shopify" element={<ShopifyVertical />} />
          <Route path="/sessions" element={<MonzaSessions />} />
          <Route path="/plataformas" element={<Plataformas />} />
          <Route path="/agentes" element={<Navigate to="/plataformas" replace />} />
          <Route path="/monzastudio" element={<Navigate to="/shopify" replace />} />
          <Route path="/studio" element={<Navigate to="/shopify" replace />} />
          <Route path="/monzahaus" element={<Navigate to="/work/monza-haus" replace />} />
          <Route path="/monzaindex" element={<Navigate to="/work/ia-index" replace />} />
          <Route path="/bavarianecons" element={<Navigate to="/work/bavarian-econs" replace />} />

          {/* English routes (with /en prefix) */}
          <Route path="/en" element={<Index />} />
          <Route path="/en/speaker" element={<Speaker />} />
          <Route path="/en/work" element={<Work />} />
          <Route path="/en/work/:slug" element={<CasoRuta />} />
          <Route path="/en/shopify" element={<ShopifyVertical />} />
          <Route path="/en/sessions" element={<MonzaSessions />} />
          <Route path="/en/plataformas" element={<Plataformas />} />
          <Route path="/en/agentes" element={<Navigate to="/en/plataformas" replace />} />
          <Route path="/en/monzastudio" element={<Navigate to="/en/shopify" replace />} />
          <Route path="/en/studio" element={<Navigate to="/en/shopify" replace />} />
          <Route path="/en/monzahaus" element={<Navigate to="/en/work/monza-haus" replace />} />
          <Route path="/en/monzaindex" element={<Navigate to="/en/work/ia-index" replace />} />
          <Route path="/en/bavarianecons" element={<Navigate to="/en/work/bavarian-econs" replace />} />

          {/* German routes (with /de prefix) */}
          <Route path="/de" element={<Index />} />
          <Route path="/de/speaker" element={<Speaker />} />
          <Route path="/de/work" element={<Work />} />
          <Route path="/de/work/:slug" element={<CasoRuta />} />
          <Route path="/de/shopify" element={<ShopifyVertical />} />
          <Route path="/de/sessions" element={<MonzaSessions />} />
          <Route path="/de/plataformas" element={<Plataformas />} />
          <Route path="/de/agentes" element={<Navigate to="/de/plataformas" replace />} />
          <Route path="/de/monzastudio" element={<Navigate to="/de/shopify" replace />} />
          <Route path="/de/studio" element={<Navigate to="/de/shopify" replace />} />
          <Route path="/de/monzahaus" element={<Navigate to="/de/work/monza-haus" replace />} />
          <Route path="/de/monzaindex" element={<Navigate to="/de/work/ia-index" replace />} />
          <Route path="/de/bavarianecons" element={<Navigate to="/de/work/bavarian-econs" replace />} />

          {/* Portuguese routes (with /pt prefix) */}
          <Route path="/pt" element={<Index />} />
          <Route path="/pt/speaker" element={<Speaker />} />
          <Route path="/pt/work" element={<Work />} />
          <Route path="/pt/work/:slug" element={<CasoRuta />} />
          <Route path="/pt/shopify" element={<ShopifyVertical />} />
          <Route path="/pt/sessions" element={<MonzaSessions />} />
          <Route path="/pt/plataformas" element={<Plataformas />} />
          <Route path="/pt/agentes" element={<Navigate to="/pt/plataformas" replace />} />
          <Route path="/pt/monzastudio" element={<Navigate to="/pt/shopify" replace />} />
          <Route path="/pt/studio" element={<Navigate to="/pt/shopify" replace />} />
          <Route path="/pt/monzahaus" element={<Navigate to="/pt/work/monza-haus" replace />} />
          <Route path="/pt/monzaindex" element={<Navigate to="/pt/work/ia-index" replace />} />
          <Route path="/pt/bavarianecons" element={<Navigate to="/pt/work/bavarian-econs" replace />} />

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
        <SpeedInsights />
        <GoogleAnalytics />
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
