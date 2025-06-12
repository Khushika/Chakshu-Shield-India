
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DownloadableResources = () => {
  const resources = [
    {
      title: "Fraud Prevention Poster - Hindi",
      description: "Comprehensive fraud awareness poster for community display",
      type: "PDF",
      size: "2.5 MB",
      downloads: "15,234",
      category: "Posters",
      languages: ["Hindi", "English"]
    },
    {
      title: "Senior Citizen Safety Checklist",
      description: "Easy-to-follow checklist for elderly citizens to stay safe",
      type: "PDF",
      size: "1.8 MB",
      downloads: "8,567",
      category: "Checklists",
      languages: ["Hindi", "English", "Tamil", "Telugu"]
    },
    {
      title: "Digital Payment Safety Guide",
      description: "Complete guide for safe UPI and online banking",
      type: "PDF",
      size: "3.2 MB",
      downloads: "22,101",
      category: "Guides",
      languages: ["Hindi", "English", "Gujarati"]
    },
    {
      title: "Children's Internet Safety Workbook",
      description: "Interactive workbook for kids to learn online safety",
      type: "PDF",
      size: "4.1 MB",
      downloads: "12,890",
      category: "Children",
      languages: ["Hindi", "English"]
    },
    {
      title: "Business Fraud Prevention Kit",
      description: "Comprehensive kit for businesses to prevent fraud",
      type: "ZIP",
      size: "8.7 MB",
      downloads: "5,432",
      category: "Business",
      languages: ["English"]
    },
    {
      title: "Quick Reference Card - Scam Types",
      description: "Pocket-sized card listing common scam types",
      type: "PDF",
      size: "0.8 MB",
      downloads: "31,567",
      category: "Quick Reference",
      languages: ["Hindi", "English", "Punjabi", "Bengali"]
    }
  ];

  const categories = ["All", "Posters", "Checklists", "Guides", "Children", "Business", "Quick Reference"];

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Downloadable Resources
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Access our collection of awareness materials, safety guides, and educational resources. 
          All materials are available in multiple Indian languages.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <Button key={category} variant="outline" size="sm">
            {category}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <Badge variant="outline">{resource.type}</Badge>
              </div>
              <p className="text-gray-600 text-sm">{resource.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Size: {resource.size}</span>
                  <span>{resource.downloads} downloads</span>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Available Languages:</p>
                  <div className="flex flex-wrap gap-1">
                    {resource.languages.map((lang, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full">Download</Button>
                  <Button variant="outline" className="w-full">Preview</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 rounded-lg p-8 mt-12">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Custom Resources for Organizations
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Need customized awareness materials for your organization? We can create branded resources 
            with your logo and specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button>Request Custom Resources</Button>
            <Button variant="outline">Contact Us</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadableResources;
