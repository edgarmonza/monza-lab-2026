import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import { LanguageProvider } from "./i18n/LanguageContext";
import { ThemeProvider } from "./theme/ThemeContext";
import { Analytics } from "@vercel/analytics/react";

import Index from "./pages/Index";
import Speaker from "./pages/Speaker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Wrapper component to provide language context inside router
const AppContent = () => (
  <LanguageProvider>
    {/* ULTRA PREMIUM BACKGROUND - Fixed, theme-aware */}
    <div className="premium-black-bg" />

    <CustomCursor />
    <ScrollToTop />
    <Navbar />
    <Routes>
      {/* Spanish routes (default - no prefix) */}
      <Route path="/" element={<Index />} />
      <Route path="/speaker" element={<Speaker />} />

      {/* English routes (with /en prefix) */}
      <Route path="/en" element={<Index />} />
      <Route path="/en/speaker" element={<Speaker />} />

      {/* German routes (with /de prefix) */}
      <Route path="/de" element={<Index />} />
      <Route path="/de/speaker" element={<Speaker />} />

      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </LanguageProvider>
);

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
