import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavigationButtons from "@/components/common/NavigationButtons";
import MobileAppHero from "@/components/mobile/MobileAppHero";
import AppMockupShowcase from "@/components/mobile/AppMockupShowcase";
import DownloadSection from "@/components/mobile/DownloadSection";
import MobileFeatures from "@/components/mobile/MobileFeatures";
import UserReviews from "@/components/mobile/UserReviews";
import AppDemoVideo from "@/components/mobile/AppDemoVideo";
import FeatureComparison from "@/components/mobile/FeatureComparison";

const MobileApp = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <MobileAppHero />

      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Navigation Buttons */}
        <NavigationButtons />

        <AppMockupShowcase />

        <DownloadSection />

        <MobileFeatures />

        <AppDemoVideo />

        <FeatureComparison />

        <UserReviews />
      </div>

      <Footer />
    </div>
  );
};

export default MobileApp;
