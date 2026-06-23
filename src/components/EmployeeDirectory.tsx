import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table';
import { 
  Users, 
  Search, 
  Filter, 
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  FileText,
  Download,
  UserPlus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  AlertCircle
} from 'lucide-react';

// Mock employee data
const employeeData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'Senior Software Engineer',
    department: 'Engineering',
    performanceScore: 9.2,
    status: 'Active',
    joinDate: '2022-03-15',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face',
    location: 'New York, NY',
    manager: 'John Smith'
  },
  {
    id: 2,
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    role: 'Sales Representative',
    department: 'Sales',
    performanceScore: 8.5,
    status: 'Active',
    joinDate: '2021-08-22',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    location: 'San Francisco, CA',
    manager: 'Lisa Wong'
  },
  {
    id: 3,
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@company.com',
    role: 'Marketing Specialist',
    department: 'Marketing',
    performanceScore: 4.2,
    status: 'Under Review',
    joinDate: '2023-01-10',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    location: 'Austin, TX',
    manager: 'Emma Davis'
  },
  {
    id: 4,
    name: 'Emma Davis',
    email: 'emma.davis@company.com',
    role: 'Finance Manager',
    department: 'Finance',
    performanceScore: 8.8,
    status: 'Active',
    joinDate: '2020-11-03',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    location: 'Chicago, IL',
    manager: 'Robert Kim'
  },
  {
    id: 5,
    name: 'Jessica Park',
    email: 'jessica.park@company.com',
    role: 'UX Designer',
    department: 'Engineering',
    performanceScore: 9.5,
    status: 'Active',
    joinDate: '2022-07-18',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    location: 'Seattle, WA',
    manager: 'John Smith'
  },
  {
    id: 6,
    name: 'Robert Kim',
    email: 'robert.kim@company.com',
    role: 'Director of Operations',
    department: 'Operations',
    performanceScore: 9.0,
    status: 'Active',
    joinDate: '2019-05-12',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    location: 'Boston, MA',
    manager: 'CEO'
  },
  {
    id: 7,
    name: 'Maria González',
    email: 'maria.gonzalez@company.com',
    role: 'HR Specialist',
    department: 'HR',
    performanceScore: 8.1,
    status: 'Active',
    joinDate: '2021-12-05',
    avatar: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=400&fit=crop&crop=face',
    location: 'Miami, FL',
    manager: 'Thomas Lee'
  },
  {
    id: 8,
    name: 'Thomas Lee',
    email: 'thomas.lee@company.com',
    role: 'VP of Human Resources',
    department: 'HR',
    performanceScore: 8.9,
    status: 'Active',
    joinDate: '2018-09-30',
    avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop&crop=face',
    location: 'Los Angeles, CA',
    manager: 'CEO'
  },
  {
    id: 9,
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    role: 'Junior Developer',
    department: 'Engineering',
    performanceScore: 7.3,
    status: 'Probation',
    joinDate: '2024-01-15',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    location: 'Portland, OR',
    manager: 'John Smith'
  },
  {
    id: 10,
    name: 'Lisa Wong',
    email: 'lisa.wong@company.com',
    role: 'Sales Manager',
    department: 'Sales',
    performanceScore: 9.1,
    status: 'Active',
    joinDate: '2020-04-07',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face',
    location: 'Denver, CO',
    manager: 'Robert Kim'
  },
  {
    id: 11,
    name: 'Jennifer Smith',
    email: 'jessifer.smith@company.com',
    role: 'Product Manager',
    department: 'Product',
    performanceScore: 8.7,
    status: 'Active',
    joinDate: '2021-06-20',
    avatar: 'https://images.unsplash.com/photo-1488508872907-592763824245?w=400&h=400&fit=crop&crop=face',
    location: 'Nashville, TN',
    manager: 'Robert Kim'
  },
  {
    id: 12,
    name: 'Carlos Rodriguez',
    email: 'carlos.rodriguez@company.com',
    role: 'Data Analyst',
    department: 'Analytics',
    performanceScore: 7.8,
    status: 'Active',
    joinDate: '2023-03-12',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop&crop=face',
    location: 'Phoenix, AZ',
    manager: 'Jennifer Smith'
  }
];

interface EmployeeDirectoryProps {
  onNavigateToProfile?: (employeeId: number) => void;
  onNavigateToReport?: (employeeId: number) => void;
}

type SortField = 'name' | 'role' | 'department' | 'performanceScore' | 'status' | 'joinDate';
type SortDirection = 'asc' | 'desc' | null;

export function EmployeeDirectory({ onNavigateToProfile, onNavigateToReport }: EmployeeDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Get unique fields for selector options
  const departments = [...new Set(employeeData.map(emp => emp.department))];
  const statuses = [...new Set(employeeData.map(emp => emp.status))];

  // Reset page safely whenever criteria modifications occur
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, departmentFilter, statusFilter]);

  // Handle Filtering and Sorting Operations
  const filteredEmployees = employeeData
    .filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            employee.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
      const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    })
    .sort((a, b) => {
      if (!sortField || !sortDirection) return 0;
      
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'performanceScore') {
        aValue = parseFloat(aValue as string);
        bValue = parseFloat(bValue as string);
      }
      
      if (sortField === 'joinDate') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  // Calculate Dynamic Statistical Summaries
  const activeCount = filteredEmployees.filter(emp => emp.status === 'Active').length;
  const reviewCount = filteredEmployees.filter(emp => emp.status === 'Under Review').length;
  const avgPerformance = filteredEmployees.length > 0 
    ? (filteredEmployees.reduce((sum, emp) => sum + emp.performanceScore, 0) / filteredEmployees.length).toFixed(1)
    : '0.0';

  // Compute Pagination Boundaries
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortField(null);
        setSortDirection(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4 opacity-50" />;
    if (sortDirection === 'asc') return <ArrowUp className="h-4 w-4 text-primary" />;
    if (sortDirection === 'desc') return <ArrowDown className="h-4 w-4 text-primary" />;
    return <ArrowUpDown className="h-4 w-4 opacity-50" />;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      case 'under review': return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      case 'probation': return 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 9) return 'text-emerald-600 font-medium';
    if (score >= 7) return 'text-amber-600 font-medium';
    if (score >= 5) return 'text-orange-600';
    return 'text-rose-600 font-semibold';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6">
      {/* Action Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employee Directory</h1>
          <p className="text-muted-foreground mt-1">
            Manage and view all employees in your organization
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-9">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="h-9">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Control Filters panel */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2 font-semibold">
            <Filter className="h-5 w-5 text-muted-foreground" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 w-full"
              />
            </div>
            <div className="grid grid-cols-2 md:flex gap-3">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="h-10 px-3 border rounded-md bg-background text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 px-3 border rounded-md bg-background text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="all">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                className="h-10 px-3 border rounded-md bg-background text-sm font-medium col-span-2 md:w-32 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Employee Table */}
      <Card className="shadow-sm overflow-hidden">
        <CardHeader className="border-b bg-muted/20">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2 font-semibold">
                <Users className="h-5 w-5 text-muted-foreground" />
                Employees
              </CardTitle>
              <CardDescription className="mt-0.5">
                Showing {filteredEmployees.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredEmployees.length)} of {filteredEmployees.length} profiles
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="p-4 font-semibold">
                    <button onClick={() => handleSort('name')} className="flex items-center gap-2 hover:text-foreground transition-colors">
                      Employee {getSortIcon('name')}
                    </button>
                  </TableHead>
                  <TableHead className="p-4 font-semibold">
                    <button onClick={() => handleSort('role')} className="flex items-center gap-2 hover:text-foreground transition-colors">
                      Role {getSortIcon('role')}
                    </button>
                  </TableHead>
                  <TableHead className="p-4 font-semibold">
                    <button onClick={() => handleSort('department')} className="flex items-center gap-2 hover:text-foreground transition-colors">
                      Department {getSortIcon('department')}
                    </button>
                  </TableHead>
                  <TableHead className="p-4 font-semibold">
                    <button onClick={() => handleSort('performanceScore')} className="flex items-center gap-2 hover:text-foreground transition-colors">
                      Performance {getSortIcon('performanceScore')}
                    </button>
                  </TableHead>
                  <TableHead className="p-4 font-semibold">
                    <button onClick={() => handleSort('status')} className="flex items-center gap-2 hover:text-foreground transition-colors">
                      Status {getSortIcon('status')}
                    </button>
                  </TableHead>
                  <TableHead className="p-4 font-semibold">
                    <button onClick={() => handleSort('joinDate')} className="flex items-center gap-2 hover:text-foreground transition-colors">
                      Join Date {getSortIcon('joinDate')}
                    </button>
                  </TableHead>
                  <TableHead className="p-4 text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                      No matching records found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedEmployees.map((employee) => (
                    <TableRow key={employee.id} className="hover:bg-muted/40 transition-colors">
                      <TableCell className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={employee.avatar}
                            alt={employee.name}
                            className="h-10 w-10 rounded-full object-cover border border-muted"
                          />
                          <div>
                            <div className="font-medium text-sm text-foreground">{employee.name}</div>
                            <div className="text-xs text-muted-foreground">{employee.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-4">
                        <div className="text-sm text-foreground">{employee.role}</div>
                        <div className="text-xs text-muted-foreground">{employee.location}</div>
                      </TableCell>
                      <TableCell className="p-4">
                        <Badge variant="outline" className="text-xs font-normal px-2.5 py-0.5 rounded-md">
                          {employee.department}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-4">
                        <span className={`text-sm ${getPerformanceColor(employee.performanceScore)}`}>
                          {employee.performanceScore} / 10
                        </span>
                      </TableCell>
                      <TableCell className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium tracking-wide ${getStatusColor(employee.status)}`}>
                          {employee.status}
                        </span>
                      </TableCell>
                      <TableCell className="p-4 text-sm text-muted-foreground">
                        {new Date(employee.joinDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </TableCell>
                      <TableCell className="p-4">
                        <div className="flex items-center gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onNavigateToProfile?.(employee.id)}
                            className="h-8 text-xs"
                          >
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            Profile
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onNavigateToReport?.(employee.id)}
                            className="h-8 text-xs"
                          >
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            Report
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Table Control Pagination Footer */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4 border-t bg-muted/10">
              <div className="text-sm text-muted-foreground order-2 sm:order-1">
                Page <span className="font-medium text-foreground">{currentPage}</span> of <span className="font-medium text-foreground">{totalPages}</span>
              </div>
              <div className="flex items-center gap-1.5 order-1 sm:order-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="h-8 px-2.5 text-xs gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  // Show current page, first, last, and immediate surrounding pages
                  if (pageNum === 1 || pageNum === totalPages || Math.abs(currentPage - pageNum) <= 1) {
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="h-8 w-8 text-xs p-0"
                      >
                        {pageNum}
                      </Button>
                    );
                  }
                  if (pageNum === 2 || pageNum === totalPages - 1) {
                    return <span key={pageNum} className="text-muted-foreground px-1 text-xs">...</span>;
                  }
                  return null;
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="h-8 px-2.5 text-xs gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Stat Grid Panel */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Records Viewable</p>
                <p className="text-3xl font-bold tracking-tight">{filteredEmployees.length}</p>
              </div>
              <div className="h-12 w-12 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Active Members</p>
                <p className="text-3xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">{activeCount}</p>
              </div>
              <div className="h-12 w-12 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center">
                <UserCheck className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Under Review</p>
                <p className="text-3xl font-bold tracking-tight text-amber-600 dark:text-amber-400">{reviewCount}</p>
              </div>
              <div className="h-12 w-12 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center">
                <AlertCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Avg Performance</p>
                <p className="text-3xl font-bold tracking-tight">{avgPerformance}</p>
              </div>
              <div className="h-12 w-12 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center">
                <div className="h-3 w-3 bg-purple-600 dark:bg-purple-400 rounded-full animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}