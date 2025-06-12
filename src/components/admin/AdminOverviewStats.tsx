
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, AlertTriangle, CheckCircle, Clock, Shield } from 'lucide-react';

const AdminOverviewStats = () => {
  const stats = [
    {
      title: "Total Reports",
      value: "12,847",
      change: "+12.5%",
      trend: "up",
      icon: AlertTriangle,
      color: "text-blue-600"
    },
    {
      title: "Pending Reviews",
      value: "234",
      change: "-8.2%",
      trend: "down",
      icon: Clock,
      color: "text-orange-600"
    },
    {
      title: "Resolved Cases",
      value: "11,890",
      change: "+15.3%",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Active Users",
      value: "45,623",
      change: "+7.8%",
      trend: "up",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Fraud Prevented",
      value: "₹89.2L",
      change: "+22.1%",
      trend: "up",
      icon: Shield,
      color: "text-india-saffron"
    },
    {
      title: "Response Time",
      value: "2.4h",
      change: "-18.5%",
      trend: "down",
      icon: TrendingUp,
      color: "text-teal-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminOverviewStats;
