
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, CheckCircle, X, AlertCircle, Clock } from 'lucide-react';

const PendingReportsQueue = () => {
  const [sortBy, setSortBy] = useState('priority');
  const [filterStatus, setFilterStatus] = useState('all');

  const reports = [
    {
      id: "RPT-2024-001",
      type: "Phone Scam",
      priority: "High",
      submittedBy: "Rajesh Kumar",
      submittedAt: "2024-01-15 14:30",
      status: "Under Review",
      amount: "₹50,000",
      urgency: "high"
    },
    {
      id: "RPT-2024-002",
      type: "SMS Fraud",
      priority: "Medium",
      submittedBy: "Priya Sharma",
      submittedAt: "2024-01-15 13:45",
      status: "Pending",
      amount: "₹15,000",
      urgency: "medium"
    },
    {
      id: "RPT-2024-003",
      type: "UPI Scam",
      priority: "Critical",
      submittedBy: "Amit Singh",
      submittedAt: "2024-01-15 12:20",
      status: "Escalated",
      amount: "₹1,25,000",
      urgency: "critical"
    },
    {
      id: "RPT-2024-004",
      type: "Email Phishing",
      priority: "Low",
      submittedBy: "Sunita Devi",
      submittedAt: "2024-01-15 11:15",
      status: "Pending",
      amount: "₹8,500",
      urgency: "low"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'under review': return <Clock className="h-4 w-4 text-orange-500" />;
      case 'escalated': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-gray-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Pending Reports Queue</CardTitle>
          <div className="flex gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.id}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(report.priority)}>
                    {report.priority}
                  </Badge>
                </TableCell>
                <TableCell>{report.submittedBy}</TableCell>
                <TableCell>{report.submittedAt}</TableCell>
                <TableCell className="font-semibold">{report.amount}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(report.status)}
                    {report.status}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-green-600">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PendingReportsQueue;
