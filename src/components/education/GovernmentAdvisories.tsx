
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const GovernmentAdvisories = () => {
  const advisories = [
    {
      id: 1,
      title: "RBI Advisory on Digital Payment Safety",
      source: "Reserve Bank of India",
      date: "2024-01-20",
      type: "Financial",
      summary: "Guidelines for safe digital transactions and UPI usage",
      link: "#"
    },
    {
      id: 2,
      title: "IT Ministry Warning on Fake Apps",
      source: "Ministry of Electronics & IT",
      date: "2024-01-18",
      type: "Technology",
      summary: "List of fraudulent mobile applications to avoid",
      link: "#"
    },
    {
      id: 3,
      title: "TRAI Alert on SIM Swap Fraud",
      source: "Telecom Regulatory Authority",
      date: "2024-01-15",
      type: "Telecom",
      summary: "Measures to prevent unauthorized SIM card replacements",
      link: "#"
    },
    {
      id: 4,
      title: "SEBI Investor Protection Guidelines",
      source: "Securities Exchange Board",
      date: "2024-01-12",
      type: "Investment",
      summary: "Updated guidelines for protecting retail investors",
      link: "#"
    }
  ];

  const initiatives = [
    {
      name: "Sanchar Saathi Portal",
      description: "Government portal to block lost/stolen mobile connections",
      authority: "Department of Telecom"
    },
    {
      name: "Cyber Dost Initiative",
      description: "Social media awareness campaign by Delhi Police",
      authority: "Delhi Police"
    },
    {
      name: "Digital India Safe",
      description: "National initiative for cybersecurity awareness",
      authority: "Ministry of Electronics & IT"
    }
  ];

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Government Advisory Notices
          </CardTitle>
          <p className="text-gray-600 text-center">
            Official advisories and warnings from government agencies
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {advisories.map((advisory) => (
              <div key={advisory.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{advisory.title}</h3>
                  <Badge variant="outline">{advisory.type}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Source: </span>
                    {advisory.source}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Date: </span>
                    {advisory.date}
                  </div>
                  <p className="text-sm">{advisory.summary}</p>
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm">Read Full Advisory</Button>
                    <Button variant="outline" size="sm">Share</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h4 className="font-semibold text-lg mb-4">Government Initiatives</h4>
            <div className="space-y-3">
              {initiatives.map((initiative, index) => (
                <div key={index} className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-blue-900">{initiative.name}</h5>
                      <p className="text-sm text-blue-700 mt-1">{initiative.description}</p>
                      <p className="text-xs text-blue-600 mt-2">By {initiative.authority}</p>
                    </div>
                    <Button variant="outline" size="sm">Visit Portal</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-2">Stay Updated</h4>
            <p className="text-sm text-orange-700 mb-3">
              Subscribe to receive the latest government advisories and security updates directly in your inbox.
            </p>
            <Button className="w-full">Subscribe to Government Alerts</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GovernmentAdvisories;
