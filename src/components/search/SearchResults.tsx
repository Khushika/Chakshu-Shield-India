
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AlertTriangle, MapPin, Calendar, User, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface SearchState {
  query: string;
  filters: {
    dateRange: { from: Date | null; to: Date | null };
    fraudTypes: string[];
    location: string;
    severity: number[];
    status: string[];
  };
  sortBy: 'date' | 'relevance' | 'severity';
  sortOrder: 'asc' | 'desc';
}

interface SearchResultsProps {
  searchState: SearchState;
  onQueryChange: (query: string) => void;
}

// Mock data for demonstration
const mockResults = [
  {
    id: '1',
    type: 'report',
    title: 'Phishing Email Targeting Bank Customers',
    description: 'Received suspicious email claiming to be from SBI asking for KYC verification with urgent deadline.',
    fraudType: 'Phishing Email',
    severity: 8,
    status: 'Under Review',
    location: 'Maharashtra',
    date: new Date('2024-01-15'),
    reportedBy: 'Anonymous User',
    comments: 23
  },
  {
    id: '2',
    type: 'alert',
    title: 'New SMS Scam Pattern Detected',
    description: 'Fraudsters using fake lottery messages with links to malicious websites for data harvesting.',
    fraudType: 'SMS Scam',
    severity: 6,
    status: 'Resolved',
    location: 'Karnataka',
    date: new Date('2024-01-14'),
    reportedBy: 'Community Moderator',
    comments: 45
  },
  {
    id: '3',
    type: 'discussion',
    title: 'How to Identify Fake Investment Schemes?',
    description: 'Discussion about red flags in investment opportunities and sharing experiences with fraudulent schemes.',
    fraudType: 'Investment Fraud',
    severity: 7,
    status: 'Active',
    location: 'Delhi',
    date: new Date('2024-01-13'),
    reportedBy: 'FraudFighter2024',
    comments: 89
  },
  {
    id: '4',
    type: 'report',
    title: 'Fake Tech Support Call from Microsoft',
    description: 'Received call claiming computer was infected, asking for remote access and payment for fake software.',
    fraudType: 'Tech Support Scam',
    severity: 5,
    status: 'Blocked',
    location: 'Tamil Nadu',
    date: new Date('2024-01-12'),
    reportedBy: 'VijayK',
    comments: 12
  }
];

const highlightText = (text: string, query: string) => {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
};

const getSeverityColor = (severity: number) => {
  if (severity >= 8) return 'bg-red-100 text-red-800';
  if (severity >= 6) return 'bg-orange-100 text-orange-800';
  if (severity >= 4) return 'bg-yellow-100 text-yellow-800';
  return 'bg-green-100 text-green-800';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Resolved': return 'bg-green-100 text-green-800';
    case 'Blocked': return 'bg-red-100 text-red-800';
    case 'Under Review': return 'bg-blue-100 text-blue-800';
    case 'Active': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'report': return <AlertTriangle className="h-4 w-4" />;
    case 'discussion': return <MessageSquare className="h-4 w-4" />;
    default: return <AlertTriangle className="h-4 w-4" />;
  }
};

const SearchResults: React.FC<SearchResultsProps> = ({ searchState }) => {
  // Filter and sort results based on search state
  let filteredResults = mockResults.filter(result => {
    // Text search
    if (searchState.query.trim()) {
      const query = searchState.query.toLowerCase();
      const matchesText = 
        result.title.toLowerCase().includes(query) ||
        result.description.toLowerCase().includes(query) ||
        result.fraudType.toLowerCase().includes(query);
      if (!matchesText) return false;
    }

    // Fraud type filter
    if (searchState.filters.fraudTypes.length > 0) {
      if (!searchState.filters.fraudTypes.includes(result.fraudType)) return false;
    }

    // Location filter
    if (searchState.filters.location) {
      if (result.location !== searchState.filters.location) return false;
    }

    // Status filter
    if (searchState.filters.status.length > 0) {
      if (!searchState.filters.status.includes(result.status)) return false;
    }

    // Severity filter
    if (result.severity < searchState.filters.severity[0] || 
        result.severity > searchState.filters.severity[1]) {
      return false;
    }

    // Date range filter
    if (searchState.filters.dateRange.from) {
      if (result.date < searchState.filters.dateRange.from) return false;
    }
    if (searchState.filters.dateRange.to) {
      if (result.date > searchState.filters.dateRange.to) return false;
    }

    return true;
  });

  // Sort results
  filteredResults.sort((a, b) => {
    let compareValue = 0;
    
    switch (searchState.sortBy) {
      case 'date':
        compareValue = a.date.getTime() - b.date.getTime();
        break;
      case 'severity':
        compareValue = a.severity - b.severity;
        break;
      case 'relevance':
      default:
        // Simple relevance based on query matches
        const aMatches = searchState.query ? 
          (a.title + a.description).toLowerCase().split(searchState.query.toLowerCase()).length - 1 : 0;
        const bMatches = searchState.query ? 
          (b.title + b.description).toLowerCase().split(searchState.query.toLowerCase()).length - 1 : 0;
        compareValue = aMatches - bMatches;
        break;
    }

    return searchState.sortOrder === 'desc' ? -compareValue : compareValue;
  });

  return (
    <div className="space-y-4">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {filteredResults.length} results found
          {searchState.query && (
            <span> for "<strong>{searchState.query}</strong>"</span>
          )}
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {filteredResults.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-500">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p className="text-sm">
                  Try adjusting your search criteria or removing some filters.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredResults.map((result) => (
            <Card key={result.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(result.type)}
                    <h3 
                      className="text-lg font-semibold"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(result.title, searchState.query)
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(result.severity)}>
                      Severity {result.severity}
                    </Badge>
                    <Badge className={getStatusColor(result.status)}>
                      {result.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p 
                  className="text-gray-600 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: highlightText(result.description, searchState.query)
                  }}
                />
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {result.reportedBy}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {result.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(result.date, 'MMM d, yyyy')}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    {result.comments} comments
                  </div>
                </div>

                <div className="mt-3">
                  <Badge 
                    variant="outline" 
                    className="text-xs"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(result.fraudType, searchState.query)
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResults;
