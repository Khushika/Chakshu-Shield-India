import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsCounter from "@/components/StatsCounter";
import FeatureCards from "@/components/FeatureCards";
import TrustBadges from "@/components/TrustBadges";
import Footer from "@/components/Footer";
import FraudReportingForm from "@/components/FraudReportingForm";
import NavigationButtons from "@/components/common/NavigationButtons";
import { Button } from "@/components/ui/button";
import { Plus, Shield } from "lucide-react";

const Index = () => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [searchParams] = useSearchParams();

  // Check if report parameter is present in URL
  useEffect(() => {
    if (searchParams.get("report") === "true") {
      setShowReportForm(true);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {!showReportForm ? (
        <>
          <Hero />
          <div className="text-center py-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => setShowReportForm(true)}
                className="bg-india-saffron hover:bg-saffron-600 text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                size="lg"
              >
                <Plus className="h-5 w-5" />
                Report Fraud Now
              </Button>
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  className="border-india-saffron text-india-saffron hover:bg-india-saffron hover:text-white dark:border-india-saffron dark:text-india-saffron dark:hover:bg-india-saffron dark:hover:text-white text-lg px-8 py-4 flex items-center gap-2"
                  size="lg"
                >
                  <Shield className="h-5 w-5" />
                  View Dashboard
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-600 dark:text-white max-w-2xl mx-auto">
              Join thousands of Indians in the fight against fraud. Report
              incidents, track trends, and help build a safer digital ecosystem
              for everyone.
            </p>
          </div>
          <StatsCounter />
          <FeatureCards />
          <TrustBadges />
          <Footer />
        </>
      ) : (
        <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900 min-h-screen">
          <NavigationButtons showBack={false} showNext={false} />
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setShowReportForm(false)}
              className="mb-4 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              ← Back to Home
            </Button>
          </div>
          <FraudReportingForm />
        </div>
      )}
    </div>
  );
};

export default Index;
