import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { Input } from './input';
import { Select } from './select';
import { 
  FileText, 
  Filter, 
  Search, 
  Calendar,
  Building2,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  RefreshCw,
  Users,
  Star,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

// Mock performance reports data
const performanceReportsData = [
  {
    id: 1,
    employeeName: 'Sarah Johnson',
    department: 'Engineering',
    role: 'Senior Software Engineer',
    month: '2025-01',
    monthLabel: 'January 2025',
    score: 9.2,
    trend: 'up',
    aiSummary: 'Exceptional performance with outstanding code quality and team collaboration. Led three major projects successfully and mentored junior developers effectively.',
    keyMetrics: {
      attendance: 98,
      taskCompletion: 95,
      teamwork: 94,
      innovation: 96
    },
    reportGenerated: '2025-01-15',
    status: 'completed'
  },
  {
    id: 2,
    employeeName: 'Mike Chen',
    department: 'Sales',
    role: 'Sales Representative',
    month: '2025-01',
    monthLabel: 'January 2025',
    score: 8.7,
    trend: 'up',
    aiSummary: 'Strong sales performance with consistent quota achievement. Excellent client relationship management and new business development skills.',
    keyMetrics: {
      attendance: 96,
      taskCompletion: 89,
      teamwork: 87,
      innovation: 85
    },
    reportGenerated: '2025-01-14',
    status: 'completed'
  },
  {
    id: 3,
    employeeName: 'Alex Rodriguez',
    department: 'Marketing',
    role: 'Marketing Specialist',
    month: '2025-01',
    monthLabel: 'January 2025',
    score: 4.2,
    trend: 'down',
    aiSummary: 'Performance below expectations with missed deadlines and communication issues. Requires immediate intervention and performance improvement plan.',
    keyMetrics: {
      attendance: 85,
      taskCompletion: 65,
      teamwork: 60,
      innovation: 70
    },
    reportGenerated: '2025-01-13',
    status: 'needs_review'
  },
  {
    id: 4,
    employeeName: 'Emma Davis',
    department: 'Finance',
    role: 'Finance Manager',
    month: '2025-01',
    monthLabel: 'January 2025',
    score: 8.9,
    trend: 'stable',
    aiSummary: 'Consistent high performance with excellent attention to detail. Strong financial analysis capabilities and effective team leadership.',
    keyMetrics: {
      attendance: 97,
      taskCompletion: 93,
      teamwork: 91,
      innovation: 88
    },
    reportGenerated: '2025-01-12',
    status: 'completed'
  },
  {
    id: 5,
    employeeName: 'Jessica Park',
    department: 'Engineering',
    role: 'UX Designer',
    month: '2024-12',
    monthLabel: 'December 2024',
    score: 9.5,
    trend: 'up',
    aiSummary: 'Outstanding design work with innovative user experience solutions. Excellent stakeholder communication and design system contributions.',
    keyMetrics: {
      attendance: 99,
      taskCompletion: 97,
      teamwork: 96,
      innovation: 98
    },
    reportGenerated: '2025-01-02',
    status: 'completed'
  },
  {
    id: 6,
    employeeName: 'Robert Kim',
    department: 'Operations',
    role: 'Operations Director',
    month: '2024-12',
    monthLabel: 'December 2024',
    score: 8.8,
    trend: 'up',
    aiSummary: 'Strong operational leadership with effective process improvements. Successfully managed year-end operations and team coordination.',
    keyMetrics: {
      attendance: 95,
      taskCompletion: 92,
      teamwork: 89,
      innovation: 87
    },
    reportGenerated: '2025-01-01',
    status: 'completed'
  },
  {
    id: 7,
    employeeName: 'Maria González',
    department: 'HR',
    role: 'HR Specialist',
    month: '2024-12',
    monthLabel: 'December 2024',
    score: 8.1,
    trend: 'stable',
    aiSummary: 'Solid performance in employee relations and recruitment. Good communication skills and effective handling of HR processes.',
    keyMetrics: {
      attendance: 94,
      taskCompletion: 88,
      teamwork: 85,
      innovation: 82
    },
    reportGenerated: '2024-12-30',
    status: 'completed'
  },
  {
    id: 8,
    employeeName: 'Thomas Lee',
    department: 'HR',
    role: 'VP of Human Resources',
    month: '2024-12',
    monthLabel: 'December 2024',
    score: 8.9,
    trend: 'up',
    aiSummary: 'Excellent strategic HR leadership with successful policy implementations. Strong team development and organizational culture initiatives.',
    keyMetrics: {
      attendance: 96,
      taskCompletion: 91,
      teamwork: 93,
      innovation: 89
    },
    reportGenerated: '2024-12-29',
    status: 'completed'
  }
];

interface PerformanceReportsListProps {
  onNavigateToReport?: (reportId: number) => void;
}

export function PerformanceReportsList({ onNavigateToReport }: PerformanceReportsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [scoreRange, setScoreRange] = useState({ min: '', max: '' });
  const [statusFilter, setStatusFilter] = useState('all');

  // Get unique values for filters
  const departments = [...new Set(performanceReportsData.map(report => report.department))];
  const months = [...new Set(performanceReportsData.map(report => report.monthLabel))];

  // Filter reports based on search and filters
  const filteredReports = performanceReportsData.filter(report => {
    const matchesSearch = report.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMonth = selectedMonth === 'all' || report.monthLabel === selectedMonth;
    const matchesDepartment = selectedDepartment === 'all' || report.department === selectedDepartment;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    
    const matchesScoreRange = (!scoreRange.min || report.score >= parseFloat(scoreRange.min)) &&
                             (!scoreRange.max || report.score <= parseFloat(scoreRange.max));

    return matchesSearch && matchesMonth && matchesDepartment && matchesStatus && matchesScoreRange;
  });

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600 bg-green-50';
    if (score >= 7) return 'text-yellow-600 bg-yellow-50';
    if (score >= 5) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 9) return 'default';
    if (score >= 7) return 'secondary';
    if (score >= 5) return 'outline';
    return 'destructive';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'needs_review': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <RefreshCw className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'needs_review': return 'Needs Review';
      default: return 'In Progress';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Performance Reports</h1>
          <p className="text-muted-foreground">
            Review and analyze employee performance reports across all departments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
          <CardDescription>
            Filter performance reports by employee, department, month, or score range
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="text-sm mb-2 block">Search Employee</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, department, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Month Filter */}
            <div>
              <label className="text-sm mb-2 block">Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background text-sm"
              >
                <option value="all">All Months</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            {/* Department Filter */}
            <div>
              <label className="text-sm mb-2 block">Department</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background text-sm"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="text-sm mb-2 block">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background text-sm"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="needs_review">Needs Review</option>
              </select>
            </div>
          </div>

          {/* Score Range */}
          <div className="mt-4">
            <label className="text-sm mb-2 block">Score Range</label>
            <div className="flex items-center gap-2 max-w-xs">
              <Input
                type="number"
                placeholder="Min"
                min="0"
                max="10"
                step="0.1"
                value={scoreRange.min}
                onChange={(e) => setScoreRange(prev => ({ ...prev, min: e.target.value }))}
                className="w-24"
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="number"
                placeholder="Max"
                min="0"
                max="10"
                step="0.1"
                value={scoreRange.max}
                onChange={(e) => setScoreRange(prev => ({ ...prev, max: e.target.value }))}
                className="w-24"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredReports.length} of {performanceReportsData.length} reports
          </p>
          {filteredReports.length !== performanceReportsData.length && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedMonth('all');
                setSelectedDepartment('all');
                setScoreRange({ min: '', max: '' });
                setStatusFilter('all');
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Employee Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium">{report.employeeName}</h3>
                        <Badge variant="outline" className="text-xs">
                          {report.department}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(report.trend)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{report.role}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge 
                          variant={getScoreBadgeVariant(report.score) as any}
                          className="px-3 py-1"
                        >
                          <Star className="h-3 w-3 mr-1" />
                          {report.score}/10
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          {getStatusIcon(report.status)}
                          {getStatusLabel(report.status)}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {report.monthLabel}
                      </p>
                    </div>
                  </div>

                  {/* AI Summary */}
                  <div className="mb-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium">AI Performance Summary</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {report.aiSummary}
                      </p>
                    </div>
                  </div>

                  {/* Key Metrics Preview */}
                  <div className="mb-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Attendance</p>
                        <p className="text-sm font-medium">{report.keyMetrics.attendance}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Task Completion</p>
                        <p className="text-sm font-medium">{report.keyMetrics.taskCompletion}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Teamwork</p>
                        <p className="text-sm font-medium">{report.keyMetrics.teamwork}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Innovation</p>
                        <p className="text-sm font-medium">{report.keyMetrics.innovation}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      Generated on {new Date(report.reportGenerated).toLocaleDateString()}
                    </div>
                    <Button
                      onClick={() => onNavigateToReport?.(report.id)}
                      size="sm"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Full Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Reports Found</h3>
            <p className="text-muted-foreground">
              No performance reports match your current filters. Try adjusting your search criteria.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Stats Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-medium">{performanceReportsData.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Performers</p>
                <p className="text-2xl font-medium text-green-600">
                  {performanceReportsData.filter(r => r.score >= 9).length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Need Review</p>
                <p className="text-2xl font-medium text-red-600">
                  {performanceReportsData.filter(r => r.score < 5).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Score</p>
                <p className="text-2xl font-medium">
                  {(performanceReportsData.reduce((sum, r) => sum + r.score, 0) / performanceReportsData.length).toFixed(1)}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}