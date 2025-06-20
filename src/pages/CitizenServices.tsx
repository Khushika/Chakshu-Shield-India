import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavigationButtons from "@/components/common/NavigationButtons";
import ServiceCard from "@/components/services/ServiceCard";
import {
  Shield,
  Smartphone,
  Network,
  CheckCircle,
  Globe,
  Wifi,
  Phone,
  MessageSquare,
} from "lucide-react";

const CitizenServices = () => {
  const services = [
    {
      title: "New Chakshu",
      subtitle:
        "Chakshu - Report Suspected Fraud & Unsolicited Commercial Communication / Spam",
      description:
        "Report suspected fraud calls, SMS, and spam communications to protect yourself and others",
      icon: Shield,
      buttonText: "Access Service",
      buttonLink: "/",
      gradientColor: "red",
    },
    {
      title: "CEIR",
      subtitle:
        "Citizen Centric Service Block your lost / stolen mobile handset",
      description:
        "Block your lost or stolen mobile device to prevent misuse and protect your personal data",
      icon: Smartphone,
      buttonText: "Block Device",
      buttonLink: "/services/ceir",
      gradientColor: "blue",
    },
    {
      title: "TAFCOP",
      subtitle: "Citizen Centric Service Know mobile connections in your name",
      description:
        "Check all mobile connections registered in your name and block unauthorized connections",
      icon: Network,
      buttonText: "Check Connections",
      buttonLink: "/services/tafcop",
      gradientColor: "green",
    },
    {
      title: "KYM",
      subtitle: "Know genuineness of your mobile handset",
      description:
        "Verify if your mobile handset is genuine and not stolen or counterfeit",
      icon: CheckCircle,
      buttonText: "Verify Device",
      buttonLink: "/services/kym",
      gradientColor: "purple",
    },
    {
      title: "Report International Calls",
      subtitle: "Report Incoming International Call With Indian Number",
      description:
        "Report suspicious international calls displaying Indian numbers to prevent fraud",
      icon: Globe,
      buttonText: "Report Call",
      buttonLink: "/services/international-calls",
      gradientColor: "yellow",
    },
    {
      title: "Know Your Wireline ISP",
      subtitle: "Know Your Wireline Internet Service Provider",
      description:
        "Identify and verify your wireline internet service provider details",
      icon: Wifi,
      buttonText: "Check ISP",
      buttonLink: "/services/wireline-isp",
      gradientColor: "teal",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Hero Section - Fully Responsive */}
      <section className="bg-gradient-to-r from-india-saffron to-saffron-600 text-white py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container-responsive">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-4">
              Citizen Centric Services
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl opacity-90 leading-relaxed px-4 max-w-3xl mx-auto">
              Government Digital Services for Telecom Consumer Protection
            </p>

            {/* Quick Stats - Mobile Friendly */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 max-w-2xl mx-auto px-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
                  6
                </div>
                <div className="text-xs sm:text-sm lg:text-base opacity-90">
                  Services Available
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
                  24/7
                </div>
                <div className="text-xs sm:text-sm lg:text-base opacity-90">
                  Support Available
                </div>
              </div>
              <div className="text-center col-span-2 sm:col-span-1">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
                  100%
                </div>
                <div className="text-xs sm:text-sm lg:text-base opacity-90">
                  Secure & Free
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Buttons - Responsive Container */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3 sm:py-4">
        <div className="container-responsive">
          <NavigationButtons />
        </div>
      </div>

      {/* Services Section */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20">
        <div className="container-responsive">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Available Services
            </h2>
            <p className="text-gray-600 dark:text-white text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed px-4">
              Comprehensive digital services to protect citizens from
              telecommunications fraud and ensure secure communication
            </p>
          </div>

          {/* Services Grid - Fully Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="group h-full">
                <ServiceCard
                  title={service.title}
                  subtitle={service.subtitle}
                  description={service.description}
                  icon={service.icon}
                  buttonText={service.buttonText}
                  buttonLink={service.buttonLink}
                  gradientColor={service.gradientColor}
                />
              </div>
            ))}
          </div>

          {/* Emergency Contact Section - Mobile Optimized */}
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold text-red-900 dark:text-red-100 mb-2">
                    Emergency Fraud Reporting
                  </h3>
                  <p className="text-red-700 dark:text-red-200 text-sm sm:text-base leading-relaxed">
                    For immediate assistance with ongoing fraud, call our 24/7
                    helpline
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href="tel:1930"
                    className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors focus-visible-ring touch-target inline-block text-center text-sm sm:text-base"
                  >
                    Call 1930
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 sm:mt-12 lg:mt-16">
            <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-india-saffron/10 dark:bg-india-saffron/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-india-saffron" />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Need Help?
                </h3>
                <p className="text-gray-600 dark:text-white text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  Our support team is available 24/7 to help you with any
                  questions about these services.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md mx-auto">
                  <a
                    href="/help"
                    className="w-full sm:w-auto bg-india-saffron hover:bg-saffron-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors focus-visible-ring touch-target text-center text-sm sm:text-base"
                  >
                    Contact Support
                  </a>
                  <a
                    href="/guidelines"
                    className="w-full sm:w-auto border border-india-saffron text-india-saffron hover:bg-india-saffron hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors focus-visible-ring touch-target text-center text-sm sm:text-base"
                  >
                    View Guidelines
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access Section for Mobile */}
          <div className="mt-8 sm:mt-12 lg:hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 sm:p-6 border border-blue-200 dark:border-blue-800">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                Quick Access
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="/dashboard"
                  className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg text-center text-xs sm:text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 touch-target"
                >
                  Dashboard
                </a>
                <a
                  href="/reports-management"
                  className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg text-center text-xs sm:text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 touch-target"
                >
                  My Reports
                </a>
                <a
                  href="/search"
                  className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg text-center text-xs sm:text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 touch-target"
                >
                  Search
                </a>
                <a
                  href="/community"
                  className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg text-center text-xs sm:text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 touch-target"
                >
                  Community
                </a>
              </div>
            </div>
          </div>

          {/* Service Info Cards - Mobile Optimized */}
          <div className="mt-8 sm:mt-12 lg:mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Security Info */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 sm:p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2 text-sm sm:text-base">
                    100% Secure
                  </h4>
                  <p className="text-green-700 dark:text-green-200 text-xs sm:text-sm leading-relaxed">
                    All services use government-grade encryption to protect your
                    data
                  </p>
                </div>
              </div>

              {/* Free Service Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 sm:p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 text-sm sm:text-base">
                    Completely Free
                  </h4>
                  <p className="text-blue-700 dark:text-blue-200 text-xs sm:text-sm leading-relaxed">
                    All government services are provided free of cost to
                    citizens
                  </p>
                </div>
              </div>

              {/* 24/7 Support Info */}
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 sm:p-6 md:col-span-2 lg:col-span-1">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2 text-sm sm:text-base">
                    24/7 Support
                  </h4>
                  <p className="text-purple-700 dark:text-purple-200 text-xs sm:text-sm leading-relaxed">
                    Round-the-clock assistance for all your service needs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CitizenServices;
