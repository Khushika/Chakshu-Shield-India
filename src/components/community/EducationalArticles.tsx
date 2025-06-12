
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Eye } from "lucide-react";

const EducationalArticles = () => {
  const articles = [
    {
      id: 1,
      title: "How to Identify Phishing Emails: A Complete Guide",
      excerpt: "Learn the telltale signs of phishing attempts and protect yourself from email-based fraud schemes.",
      category: "Email Security",
      readTime: "5 min read",
      views: "12.3k",
      difficulty: "Beginner",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "UPI Safety: Best Practices for Digital Payments",
      excerpt: "Essential tips for secure UPI transactions and avoiding payment-related fraud in India.",
      category: "Digital Payments",
      readTime: "7 min read",
      views: "8.7k",
      difficulty: "Intermediate",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Social Engineering Tactics: Psychology of Fraud",
      excerpt: "Understand how fraudsters manipulate human psychology to gain trust and steal information.",
      category: "Psychology",
      readTime: "10 min read",
      views: "15.2k",
      difficulty: "Advanced",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Protecting Elderly from Financial Fraud",
      excerpt: "Special considerations and strategies to help senior citizens avoid becoming fraud victims.",
      category: "Senior Safety",
      readTime: "6 min read",
      views: "9.1k",
      difficulty: "Beginner",
      image: "/placeholder.svg"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      "Beginner": "bg-green-100 text-green-800",
      "Intermediate": "bg-yellow-100 text-yellow-800",
      "Advanced": "bg-red-100 text-red-800"
    };
    return colors[difficulty as keyof typeof colors] || colors.Beginner;
  };

  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Fraud Awareness Articles
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Expert-curated educational content to help you stay one step ahead of fraudsters.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="hover:shadow-lg transition-shadow group">
            <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {article.category}
                </Badge>
                <Badge className={getDifficultyColor(article.difficulty)}>
                  {article.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
                {article.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {article.readTime}
                </div>
                <div className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {article.views}
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <BookOpen className="h-4 w-4 mr-2" />
                Read Article
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default EducationalArticles;
