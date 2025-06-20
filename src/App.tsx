import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/EnhancedThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Community from "./pages/Community";
import Education from "./pages/Education";
import MobileApp from "./pages/MobileApp";
import AIFeatures from "./pages/AIFeatures";
import AdminDashboard from "./pages/AdminDashboard";
import NotificationSettings from "./pages/NotificationSettings";
import NotificationHistory from "./pages/NotificationHistory";
import HelpCenter from "./pages/HelpCenter";
import AdvancedSearch from "./pages/AdvancedSearch";
import Analytics from "./pages/Analytics";
import ReportsManagement from "./pages/ReportsManagement";
import CitizenServices from "./pages/CitizenServices";
import CEIRBlocking from "./pages/CEIRBlocking";
import TAFCOPCheck from "./pages/TAFCOPCheck";
import KYMVerification from "./pages/KYMVerification";
import InternationalCallReport from "./pages/InternationalCallReport";
import WirelineISPCheck from "./pages/WirelineISPCheck";
import VoiceReporting from "./pages/VoiceReporting";
import Guidelines from "./pages/Guidelines";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <main id="main-content" tabIndex={-1}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/education" element={<Education />} />
                    <Route path="/mobile-app" element={<MobileApp />} />
                    <Route path="/ai-features" element={<AIFeatures />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route
                      path="/notifications/settings"
                      element={<NotificationSettings />}
                    />
                    <Route
                      path="/notifications/history"
                      element={<NotificationHistory />}
                    />
                    <Route path="/help" element={<HelpCenter />} />
                    <Route path="/search" element={<AdvancedSearch />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route
                      path="/reports-management"
                      element={<ReportsManagement />}
                    />
                    <Route
                      path="/citizen-services"
                      element={<CitizenServices />}
                    />
                    <Route path="/services/ceir" element={<CEIRBlocking />} />
                    <Route path="/services/tafcop" element={<TAFCOPCheck />} />
                    <Route path="/services/kym" element={<KYMVerification />} />
                    <Route
                      path="/services/international-calls"
                      element={<InternationalCallReport />}
                    />
                    <Route
                      path="/services/wireline-isp"
                      element={<WirelineISPCheck />}
                    />
                    <Route
                      path="/voice-reporting"
                      element={<VoiceReporting />}
                    />
                    <Route path="/guidelines" element={<Guidelines />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </BrowserRouter>
            </div>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
