
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, X } from "lucide-react";

const AlertNotifications = () => {
  const alerts = [
    {
      id: 1,
      type: "High Activity",
      message: "Increased fraud activity in your area",
      time: "1 hour ago",
      priority: "high",
      read: false
    },
    {
      id: 2,
      type: "Report Update",
      message: "Your report RPT-001 has been resolved",
      time: "3 hours ago",
      priority: "medium",
      read: false
    },
    {
      id: 3,
      type: "New Pattern",
      message: "New phishing pattern detected",
      time: "1 day ago",
      priority: "medium",
      read: true
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Alert Notifications
          <Badge variant="secondary" className="ml-auto">
            {alerts.filter(alert => !alert.read).length} new
          </Badge>
        </CardTitle>
        <CardDescription>
          Important updates and security alerts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`border rounded-lg p-3 ${
                !alert.read ? 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(alert.priority)}>
                    {alert.type}
                  </Badge>
                  {!alert.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <X className="h-3 w-3" />
                </Button>
              </div>
              
              <p className="text-sm text-gray-700 dark:text-white mb-2">
                {alert.message}
              </p>
              
              <span className="text-xs text-gray-500">{alert.time}</span>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4">
          View All Notifications
        </Button>
      </CardContent>
    </Card>
  );
};

export default AlertNotifications;
