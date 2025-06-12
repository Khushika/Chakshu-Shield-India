
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { MessageCircle, ThumbsUp, Clock, Pin } from "lucide-react";

const DiscussionForum = () => {
  const forumPosts = [
    {
      id: 1,
      title: "New UPI scam targeting senior citizens - Please share with elderly family",
      author: "CommunityGuardian",
      category: "Warning",
      replies: 23,
      likes: 45,
      timeAgo: "2 hours ago",
      isPinned: true,
      preview: "I want to alert everyone about a new UPI scam where fraudsters are calling elderly people claiming to be from their bank..."
    },
    {
      id: 2,
      title: "How I avoided a cryptocurrency investment scam - Red flags to watch",
      author: "TechSavvy2024",
      category: "Experience",
      replies: 18,
      likes: 32,
      timeAgo: "5 hours ago",
      isPinned: false,
      preview: "Last week someone approached me with a 'guaranteed' crypto investment opportunity. Here's how I spotted the red flags..."
    },
    {
      id: 3,
      title: "Fake job portal asking for registration fees - Company name list",
      author: "JobSeeker",
      category: "Alert",
      replies: 67,
      likes: 89,
      timeAgo: "1 day ago",
      isPinned: false,
      preview: "I've compiled a list of fake job portals that are asking for registration fees. Please be careful..."
    },
    {
      id: 4,
      title: "Romance scam recovery support group",
      author: "SupportHelper",
      category: "Support",
      replies: 42,
      likes: 156,
      timeAgo: "2 days ago",
      isPinned: false,
      preview: "For those who have been victims of romance scams, this is a safe space to share experiences and get support..."
    },
    {
      id: 5,
      title: "Regional fraud trends - Mumbai area analysis",
      author: "DataAnalyst",
      category: "Analysis",
      replies: 15,
      likes: 28,
      timeAgo: "3 days ago",
      isPinned: false,
      preview: "Based on the last month's data, here are the most common fraud types in Mumbai and surrounding areas..."
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Warning": "bg-red-100 text-red-800",
      "Experience": "bg-blue-100 text-blue-800",
      "Alert": "bg-orange-100 text-orange-800",
      "Support": "bg-purple-100 text-purple-800",
      "Analysis": "bg-green-100 text-green-800"
    };
    return colors[category as keyof typeof colors] || colors.Experience;
  };

  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Community Forum
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Share experiences, ask questions, and help others stay safe from fraud.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex space-x-4">
            <Button className="bg-india-saffron hover:bg-saffron-600">
              New Discussion
            </Button>
            <Button variant="outline">
              Browse Categories
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {forumPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10">
                    <div className="w-full h-full bg-gradient-to-br from-india-saffron to-saffron-600 flex items-center justify-center text-white font-semibold">
                      {post.author.charAt(0)}
                    </div>
                  </Avatar>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-2">
                      {post.isPinned && (
                        <Pin className="h-4 w-4 text-india-saffron" />
                      )}
                      <Badge className={getCategoryColor(post.category)}>
                        {post.category}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        by {post.author}
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.timeAgo}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-india-saffron cursor-pointer">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 line-clamp-2">
                      {post.preview}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center hover:text-india-saffron cursor-pointer">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.replies} replies
                      </div>
                      <div className="flex items-center hover:text-india-saffron cursor-pointer">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {post.likes} likes
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            Load More Discussions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DiscussionForum;
