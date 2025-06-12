
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const VideoTutorials = () => {
  const tutorials = [
    {
      title: "How to Report Fraud - Step by Step",
      duration: "5:30",
      difficulty: "Beginner",
      description: "Complete walkthrough of the fraud reporting process on our platform",
      category: "Reporting Process",
      thumbnail: "/placeholder.svg"
    },
    {
      title: "Identifying Phishing Emails",
      duration: "8:15",
      difficulty: "Beginner",
      description: "Learn to spot fake emails and protect your personal information",
      category: "Email Security",
      thumbnail: "/placeholder.svg"
    },
    {
      title: "UPI Fraud Prevention",
      duration: "6:45",
      difficulty: "Intermediate",
      description: "Stay safe while using digital payment methods",
      category: "Digital Payments",
      thumbnail: "/placeholder.svg"
    },
    {
      title: "Investment Scam Red Flags",
      duration: "12:20",
      difficulty: "Advanced",
      description: "Recognize fraudulent investment schemes before you lose money",
      category: "Investment Security",
      thumbnail: "/placeholder.svg"
    },
    {
      title: "Social Media Safety",
      duration: "7:40",
      difficulty: "Beginner",
      description: "Protect yourself from fraud on social media platforms",
      category: "Social Media",
      thumbnail: "/placeholder.svg"
    },
    {
      title: "Senior Citizen Specific Scams",
      duration: "9:30",
      difficulty: "Beginner",
      description: "Common scams targeting elderly citizens and how to avoid them",
      category: "Senior Protection",
      thumbnail: "/placeholder.svg"
    }
  ];

  const categories = ["All", "Reporting Process", "Email Security", "Digital Payments", "Investment Security", "Social Media", "Senior Protection"];

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Video Tutorials
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Watch step-by-step tutorials to learn fraud prevention techniques and understand the reporting process.
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
        {tutorials.map((tutorial, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <div className="relative">
                <img 
                  src={tutorial.thumbnail} 
                  alt={tutorial.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-t-lg hover:bg-opacity-20 transition-all cursor-pointer">
                  <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[12px] border-l-india-saffron border-y-[8px] border-y-transparent ml-1"></div>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary">{tutorial.duration}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg leading-tight">{tutorial.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{tutorial.description}</p>
                <div className="flex justify-between items-center">
                  <Badge variant={tutorial.difficulty === 'Beginner' ? 'secondary' : tutorial.difficulty === 'Intermediate' ? 'default' : 'destructive'}>
                    {tutorial.difficulty}
                  </Badge>
                  <span className="text-xs text-gray-500">{tutorial.category}</span>
                </div>
                <Button className="w-full">Watch Tutorial</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Subscribe for Updates</h3>
            <p className="text-sm text-gray-600 mb-4">Get notified when new tutorials are available</p>
            <Button className="w-full">Subscribe to Channel</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default VideoTutorials;
