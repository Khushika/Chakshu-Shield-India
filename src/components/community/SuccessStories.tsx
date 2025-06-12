
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Sparkles, ArrowRight } from "lucide-react";

const SuccessStories = () => {
  const successStories = [
    {
      id: 1,
      title: "Community Warning Prevents Mass Investment Scam",
      impact: "₹2.3 Crore Saved",
      victims: "450+ People Protected",
      description: "Quick community response to a fake cryptocurrency investment scheme prevented hundreds from losing their life savings.",
      date: "March 2024",
      type: "Investment Fraud",
      outcome: "Scammers arrested, funds recovered"
    },
    {
      id: 2,
      title: "Senior Citizen Safety Campaign Success",
      impact: "85% Reduction",
      victims: "2,000+ Elderly Protected",
      description: "Educational campaign targeting senior citizens resulted in significant reduction of tech support scams in Mumbai area.",
      date: "February 2024",
      type: "Tech Support Scam",
      outcome: "Community education program launched"
    },
    {
      id: 3,
      title: "Rapid Response Stops UPI Fraud Ring",
      impact: "₹45 Lakh Prevented",
      victims: "200+ Users Alerted",
      description: "Real-time community alerts helped identify and stop a coordinated UPI fraud attack across multiple cities.",
      date: "January 2024",
      type: "Digital Payment Fraud",
      outcome: "Fraud ring dismantled"
    }
  ];

  const achievements = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "50,000+",
      subtitle: "Active Community Members",
      description: "Citizens working together to fight fraud"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-green-600" />,
      title: "₹15 Crore",
      subtitle: "Total Amount Saved",
      description: "Money protected from fraudsters"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-yellow-600" />,
      title: "92%",
      subtitle: "Success Rate",
      description: "Of reported scams successfully resolved"
    }
  ];

  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Success Stories & Impact
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Real outcomes achieved through community collaboration and vigilance.
        </p>
      </div>

      {/* Achievement Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {achievements.map((achievement, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                {achievement.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {achievement.title}
              </div>
              <div className="text-lg font-semibold text-india-saffron mb-2">
                {achievement.subtitle}
              </div>
              <p className="text-sm text-gray-600">
                {achievement.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Success Stories */}
      <div className="space-y-8">
        {successStories.map((story) => (
          <Card key={story.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {story.type}
                </Badge>
                <span className="text-sm text-gray-500">{story.date}</span>
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                {story.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                {story.description}
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    {story.impact}
                  </div>
                  <div className="text-sm text-gray-600">Financial Impact</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {story.victims}
                  </div>
                  <div className="text-sm text-gray-600">Lives Protected</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-sm font-medium text-purple-600">
                    {story.outcome}
                  </div>
                  <div className="text-sm text-gray-600">Final Outcome</div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                Read Full Story
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center p-8 bg-gradient-to-r from-india-saffron to-saffron-600 rounded-lg text-white">
        <h3 className="text-2xl font-bold mb-4">
          Be Part of the Solution
        </h3>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Join our community and help protect millions of citizens from fraud. Every report matters, every alert saves lives.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="bg-white text-india-saffron hover:bg-gray-100">
            Join Community
          </Button>
          <Button variant="outline" className="bg-white text-india-saffron hover:bg-gray-100">
            Report Fraud Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
