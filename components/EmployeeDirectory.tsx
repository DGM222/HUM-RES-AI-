import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table } from './ui/table';
import { Avatar } from './ui/avatar';
import { Select } from './ui/select';
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
  ChevronRight
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
    email: 'jennifer.smith@company.com',
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

  // Get unique departments and statuses for filters
  const departments = [...new Set(employeeData.map(emp => emp.department))];
  const statuses = [...new Set(employeeData.map(emp => emp.status))];

  // Filter and sort employees
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

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
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
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    if (sortDirection === 'asc') return <ArrowUp className="h-4 w-4" />;
    if (sortDirection === 'desc') return <ArrowDown className="h-4 w-4" />;
    return <ArrowUpDown className="h-4 w-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'under review': return 'bg-yellow-100 text-yellow-800';
      case 'probation': return 'bg-orange-100 text-orange-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 9) return 'text-green-600';
    if (score >= 7) return 'text-yellow-600';
    if (score >= 5) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Employee Directory</h1>
          <p className="text-muted-foreground">
            Manage and view all employees in your organization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
                <option value={100}>100 per page</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Employees
              </CardTitle>
              <CardDescription>
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredEmployees.length)} of {filteredEmployees.length} employees
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-2 hover:bg-muted"
                    >
                      Employee
                      {getSortIcon('name')}
                    </Button>
                  </th>
                  <th className="text-left p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('role')}
                      className="flex items-center gap-2 hover:bg-muted"
                    >
                      Role
                      {getSortIcon('role')}
                    </Button>
                  </th>
                  <th className="text-left p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('department')}
                      className="flex items-center gap-2 hover:bg-muted"
                    >
                      Department
                      {getSortIcon('department')}
                    </Button>
                  </th>
                  <th className="text-left p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('performanceScore')}
                      className="flex items-center gap-2 hover:bg-muted"
                    >
                      Performance
                      {getSortIcon('performanceScore')}
                    </Button>
                  </th>
                  <th className="text-left p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('status')}
                      className="flex items-center gap-2 hover:bg-muted"
                    >
                      Status
                      {getSortIcon('status')}
                    </Button>
                  </th>
                  <th className="text-left p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('joinDate')}
                      className="flex items-center gap-2 hover:bg-muted"
                    >
                      Join Date
                      {getSortIcon('joinDate')}
                    </Button>
                  </th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={employee.avatar}
                            alt={employee.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm">{employee.name}</div>
                          <div className="text-xs text-muted-foreground">{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">{employee.role}</div>
                      <div className="text-xs text-muted-foreground">{employee.location}</div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs">
                        {employee.department}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className={`text-sm ${getPerformanceColor(employee.performanceScore)}`}>
                        {employee.performanceScore}/10
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">{new Date(employee.joinDate).toLocaleDateString()}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onNavigateToProfile?.(employee.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Profile
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onNavigateToReport?.(employee.id)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Report
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  if (pageNum > totalPages) return null;
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-2xl">{employeeData.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl text-green-600">
                  {employeeData.filter(emp => emp.status === 'Active').length}
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 bg-green-600 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Under Review</p>
                <p className="text-2xl text-yellow-600">
                  {employeeData.filter(emp => emp.status === 'Under Review').length}
                </p>
              </div>
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 bg-yellow-600 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Performance</p>
                <p className="text-2xl">
                  {(employeeData.reduce((sum, emp) => sum + emp.performanceScore, 0) / employeeData.length).toFixed(1)}
                </p>
              </div>
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 bg-purple-600 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}