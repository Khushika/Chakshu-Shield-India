
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

const ReportGeneration = () => {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [reportType, setReportType] = useState('');
  const [format_type, setFormatType] = useState('');

  const reportTypes = [
    { value: 'fraud-summary', label: 'Fraud Summary Report' },
    { value: 'user-activity', label: 'User Activity Report' },
    { value: 'regional-analysis', label: 'Regional Analysis Report' },
    { value: 'trend-analysis', label: 'Trend Analysis Report' },
    { value: 'financial-impact', label: 'Financial Impact Report' },
    { value: 'response-time', label: 'Response Time Report' }
  ];

  const quickReports = [
    {
      title: "Today's Summary",
      description: "Quick overview of today's fraud reports",
      icon: BarChart3,
      action: () => console.log('Generate today summary')
    },
    {
      title: "Weekly Trends",
      description: "Last 7 days fraud pattern analysis",
      icon: TrendingUp,
      action: () => console.log('Generate weekly trends')
    },
    {
      title: "Monthly Overview",
      description: "Complete monthly fraud statistics",
      icon: PieChart,
      action: () => console.log('Generate monthly overview')
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickReports.map((report, index) => {
          const Icon = report.icon;
          return (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Icon className="h-8 w-8 text-india-saffron" />
                  <div>
                    <h3 className="font-semibold">{report.title}</h3>
                    <p className="text-sm text-gray-500">{report.description}</p>
                  </div>
                </div>
                <Button 
                  className="w-full mt-4" 
                  variant="outline"
                  onClick={report.action}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custom Report Generation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="report-type">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="format">Export Format</Label>
                <Select value={format_type} onValueChange={setFormatType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Date Range</Label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFrom ? format(dateFrom, "PPP") : "From date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateFrom}
                        onSelect={setDateFrom}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateTo ? format(dateTo, "PPP") : "To date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dateTo}
                        onSelect={setDateTo}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Report To</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@chaksu.gov.in"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button 
              className="bg-india-saffron hover:bg-saffron-600"
              disabled={!reportType || !format_type}
            >
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportGeneration;
