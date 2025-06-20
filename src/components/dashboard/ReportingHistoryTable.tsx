import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ReportDetailsModal from "./ReportDetailsModal";

interface ReportingHistoryTableProps {
  filters: {
    dateRange: { preset: string };
    status: string[];
    fraudTypes: string[];
    severity: string[];
    location: string;
    amountRange: any;
  };
}

interface Report {
  id: string;
  date: string;
  type: string;
  description: string;
  status: string;
  impact: string;
}

const ReportingHistoryTable = ({ filters }: ReportingHistoryTableProps) => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reports = [
    {
      id: "RPT-001",
      date: "2024-05-28",
      type: "Phishing",
      description: "Fake bank email requesting credentials",
      status: "Resolved",
      impact: "High",
    },
    {
      id: "RPT-002",
      date: "2024-05-25",
      type: "SMS Fraud",
      description: "Lottery scam text message",
      status: "Under Review",
      impact: "Medium",
    },
    {
      id: "RPT-003",
      date: "2024-05-22",
      type: "Call Fraud",
      description: "Fake tech support call",
      status: "Resolved",
      impact: "High",
    },
    {
      id: "RPT-004",
      date: "2024-05-20",
      type: "Email Spam",
      description: "Investment scam email",
      status: "Pending",
      impact: "Low",
    },
  ];

  const handleViewDetails = (report: any) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  const getStatusBadge = (status: string) => {
    let variant: "default" | "destructive" | "outline" | "secondary" =
      "outline";

    if (status === "Resolved") {
      variant = "default";
    } else if (status === "Under Review") {
      variant = "secondary";
    } else if (status === "Pending") {
      variant = "outline";
    }

    return <Badge variant={variant}>{status}</Badge>;
  };

  const getImpactBadge = (impact: string) => {
    const colors = {
      High: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      Medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      Low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };
    return (
      <Badge className={colors[impact as keyof typeof colors]}>{impact}</Badge>
    );
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Report ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Impact</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">{report.id}</TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>{report.type}</TableCell>
              <TableCell className="max-w-xs truncate">
                {report.description}
              </TableCell>
              <TableCell>{getStatusBadge(report.status)}</TableCell>
              <TableCell>{getImpactBadge(report.impact)}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewDetails(report)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ReportDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        report={selectedReport}
      />
    </div>
  );
};

export default ReportingHistoryTable;
