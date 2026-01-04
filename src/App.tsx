import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { WalletProvider } from "@/contexts/WalletContext";
import { WatchlistProvider } from "@/contexts/WatchlistContext";
import { PortfolioProvider } from "@/contexts/PortfolioContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import PriceAlertProvider from "@/components/PriceAlertProvider";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CoinDetail from "./pages/CoinDetail";
import Portfolio from "./pages/Portfolio";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AuthProvider>
        <SettingsProvider>
          <WalletProvider>
            <WatchlistProvider>
              <PortfolioProvider>
                <PriceAlertProvider>
                  <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/coin/:coinId" element={<CoinDetail />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </BrowserRouter>
                  </TooltipProvider>
                </PriceAlertProvider>
              </PortfolioProvider>
            </WatchlistProvider>
          </WalletProvider>
        </SettingsProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
