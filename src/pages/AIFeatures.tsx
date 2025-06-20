import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavigationButtons from "@/components/common/NavigationButtons";
import AIFeaturesHero from "@/components/ai/AIFeaturesHero";
import RealTimeAnalysis from "@/components/ai/RealTimeAnalysis";
import ThreatAssessment from "@/components/ai/ThreatAssessment";
import DuplicateDetection from "@/components/ai/DuplicateDetection";
import PredictiveTrends from "@/components/ai/PredictiveTrends";
import ConfidenceScoring from "@/components/ai/ConfidenceScoring";
import ModelPerformance from "@/components/ai/ModelPerformance";
import AutoCategorization from "@/components/ai/AutoCategorization";
import NetworkMapping from "@/components/ai/NetworkMapping";
import RiskCalculator from "@/components/ai/RiskCalculator";
import PreventionTips from "@/components/ai/PreventionTips";
import { LanguageProvider } from "@/components/language/LanguageProvider";

const AIFeatures = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <AIFeaturesHero />

        <div className="container mx-auto px-4 py-12 space-y-16">
          {/* Navigation Buttons */}
          <NavigationButtons />

          <RealTimeAnalysis />
          <ThreatAssessment />
          <DuplicateDetection />
          <PredictiveTrends />
          <ConfidenceScoring />
          <ModelPerformance />
          <AutoCategorization />
          <NetworkMapping />
          <RiskCalculator />
          <PreventionTips />
        </div>

        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default AIFeatures;
