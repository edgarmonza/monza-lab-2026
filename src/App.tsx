import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import { LanguageProvider } from "./i18n/LanguageContext";
import { ThemeProvider } from "./theme/ThemeContext";

import Index from "./pages/Index";
import Press from "./pages/Press";
import Studio from "./pages/Studio";
import StudioPro from "./pages/StudioPro";
import Sessions from "./pages/Sessions";
import MonzaQuantum from "./pages/MonzaQuantum";
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
      <Route path="/studio" element={<Studio />} />
      <Route path="/studio-pro" element={<StudioPro />} />
      <Route path="/sessions" element={<Sessions />} />
      <Route path="/quantum" element={<MonzaQuantum />} />
      <Route path="/press" element={<Press />} />
      <Route path="/speaker" element={<Speaker />} />

      {/* English routes (with /en prefix) */}
      <Route path="/en" element={<Index />} />
      <Route path="/en/studio" element={<Studio />} />
      <Route path="/en/studio-pro" element={<StudioPro />} />
      <Route path="/en/sessions" element={<Sessions />} />
      <Route path="/en/quantum" element={<MonzaQuantum />} />
      <Route path="/en/press" element={<Press />} />
      <Route path="/en/speaker" element={<Speaker />} />

      {/* Redirect old sessions routes to home */}
      <Route path="/sessions-2026" element={<Navigate to="/" replace />} />
      <Route path="/monza-sessions" element={<Navigate to="/" replace />} />

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
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
