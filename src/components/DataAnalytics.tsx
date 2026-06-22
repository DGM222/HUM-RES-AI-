import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  UserX, 
  Star, 
  AlertTriangle,
  Calendar,
  BarChart3,
  Download,
  Filter,
  RefreshCw,
  Target,
  Award,
  Clock,
  Activity
} from 'lucide-react';

// Mock data for performance trends over time
const performanceTrendsData = [
  { month: 'Jan 2024', averageScore: 7.8, totalEmployees: 245, highPerformers: 42, lowPerformers: 18 },
  { month: 'Feb 2024', averageScore: 8.1, totalEmployees: 248, highPerformers: 45, lowPerformers: 16 },
  { month: 'Mar 2024', averageScore: 7.9, totalEmployees: 250, highPerformers: 44, lowPerformers: 19 },
  { month: 'Apr 2024', averageScore: 8.3, totalEmployees: 252, highPerformers: 48, lowPerformers: 14 },
  { month: 'May 2024', averageScore: 8.2, totalEmployees: 255, highPerformers: 49, lowPerformers: 15 },
  { month: 'Jun 2024', averageScore: 8.4, totalEmployees: 258, highPerformers: 52, lowPerformers: 12 },
  { month: 'Jul 2024', averageScore: 8.1, totalEmployees: 260, highPerformers: 48, lowPerformers: 16 },
  { month: 'Aug 2024', averageScore: 8.5, totalEmployees: 262, highPerformers: 54, lowPerformers: 11 },
  { month: 'Sep 2024', averageScore: 8.3, totalEmployees: 265, highPerformers: 51, lowPerformers: 13 },
  { month: 'Oct 2024', averageScore: 8.6, totalEmployees: 267, highPerformers: 56, lowPerformers: 10 },
  { month: 'Nov 2024', averageScore: 8.4, totalEmployees: 270, highPerformers: 53, lowPerformers: 12 },
  { month: 'Dec 2024', averageScore: 8.7, totalEmployees: 272, highPerformers: 58, lowPerformers: 9 }
];

// Mock data for terminations over time
const terminationsData = [
  { month: 'Jan 2024', voluntary: 8, involuntary: 3, total: 11, newHires: 15 },
  { month: 'Feb 2024', voluntary: 6, involuntary: 2, total: 8, newHires: 11 },
  { month: 'Mar 2024', voluntary: 7, involuntary: 4, total: 11, newHires: 13 },
  { month: 'Apr 2024', voluntary: 5, involuntary: 2, total: 7, newHires: 9 },
  { month: 'May 2024', voluntary: 9, involuntary: 1, total: 10, newHires: 13 },
  { month: 'Jun 2024', voluntary: 8, involuntary: 3, total: 11, newHires: 14 },
  { month: 'Jul 2024', voluntary: 6, involuntary: 2, total: 8, newHires: 10 },
  { month: 'Aug 2024', voluntary: 7, involuntary: 1, total: 8, newHires: 10 },
  { month: 'Sep 2024', voluntary: 5, involuntary: 3, total: 8, newHires: 11 },
  { month: 'Oct 2024', voluntary: 8, involuntary: 2, total: 10, newHires: 12 },
  { month: 'Nov 2024', voluntary: 6, involuntary: 1, total: 7, newHires: 10 },
  { month: 'Dec 2024', voluntary: 9, involuntary: 2, total: 11, newHires: 13 }
];

// Mock data for review actions
const reviewActionsData = [
  { month: 'Jan 2024', performanceReviews: 45, disciplinaryActions: 8, promotions: 12, warnings: 6 },
  { month: 'Feb 2024', performanceReviews: 52, disciplinaryActions: 6, promotions: 15, warnings: 4 },
  { month: 'Mar 2024', performanceReviews: 48, disciplinaryActions: 9, promotions: 11, warnings: 7 },
  { month: 'Apr 2024', performanceReviews: 55, disciplinaryActions: 5, promotions: 18, warnings: 3 },
  { month: 'May 2024', performanceReviews: 51, disciplinaryActions: 7, promotions: 14, warnings: 5 },
  { month: 'Jun 2024', performanceReviews: 58, disciplinaryActions: 4, promotions: 20, warnings: 2 },
  { month: 'Jul 2024', performanceReviews: 49, disciplinaryActions: 8, promotions: 13, warnings: 6 },
  { month: 'Aug 2024', performanceReviews: 53, disciplinaryActions: 3, promotions: 16, warnings: 2 },
  { month: 'Sep 2024', performanceReviews: 56, disciplinaryActions: 6, promotions: 17, warnings: 4 },
  { month: 'Oct 2024', performanceReviews: 60, disciplinaryActions: 4, promotions: 19, warnings: 3 },
  { month: 'Nov 2024', performanceReviews: 54, disciplinaryActions: 5, promotions: 15, warnings: 4 },
  { month: 'Dec 2024', performanceReviews: 62, disciplinaryActions: 3, promotions: 22, warnings: 2 }
];

// Department performance data
const departmentData = [
  { department: 'Engineering', averageScore: 8.9, employees: 85, satisfaction: 92 },
  { department: 'Sales', averageScore: 8.4, employees: 62, satisfaction: 88 },
  { department: 'Marketing', averageScore: 8.2, employees: 34, satisfaction: 85 },
  { department: 'Finance', averageScore: 8.7, employees: 28, satisfaction: 91 },
  { department: 'Operations', averageScore: 8.1, employees: 45, satisfaction: 84 },
  { department: 'HR', averageScore: 8.8, employees: 18, satisfaction: 94 }
];

// Performance distribution data
const performanceDistribution = [
  { range: '9.0-10.0', count: 58, percentage: 21.3, color: '#22c55e' },
  { range: '8.0-8.9', count: 89, percentage: 32.7, color: '#3b82f6' },
  { range: '7.0-7.9', count: 76, percentage: 27.9, color: '#f59e0b' },
  { range: '6.0-6.9', count: 34, percentage: 12.5, color: '#f97316' },
  { range: 'Below 6.0', count: 15, percentage: 5.5, color: '#ef4444' }
];

export function DataAnalytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('12m');
  const [selectedMetric, setSelectedMetric] = useState('performance');

  const timeRangeOptions = [
    { value: '3m', label: '3 Months' },
    { value: '6m', label: '6 Months' },
    { value: '12m', label: '12 Months' },
    { value: '24m', label: '24 Months' }
  ];

  // Calculate key metrics
  const currentMonthData = performanceTrendsData[performanceTrendsData.length - 1];
  const previousMonthData = performanceTrendsData[performanceTrendsData.length - 2];
  const performanceChange = ((currentMonthData.averageScore - previousMonthData.averageScore) / previousMonthData.averageScore * 100).toFixed(1);
  
  const totalTerminations = terminationsData.reduce((sum, month) => sum + month.total, 0);
  const totalHires = terminationsData.reduce((sum, month) => sum + month.newHires, 0);
  const netGrowth = totalHires - totalTerminations;

  const totalReviews = reviewActionsData.reduce((sum, month) => sum + month.performanceReviews, 0);
  const totalPromotions = reviewActionsData.reduce((sum, month) => sum + month.promotions, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Data Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive HR metrics and performance insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
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

      {/* Time Range Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Time Range:</span>
        <div className="flex gap-2">
          {timeRangeOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedTimeRange === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTimeRange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Performance Score</p>
                <p className="text-2xl font-medium">{currentMonthData.averageScore}</p>
                <div className="flex items-center gap-1 mt-1">
                  {parseFloat(performanceChange) > 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span className={`text-xs ${parseFloat(performanceChange) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {performanceChange}%
                  </span>
                </div>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Performers</p>
                <p className="text-2xl font-medium">{currentMonthData.highPerformers}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {((currentMonthData.highPerformers / currentMonthData.totalEmployees) * 100).toFixed(1)}% of workforce
                </p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Net Employee Growth</p>
                <p className="text-2xl font-medium">{netGrowth > 0 ? '+' : ''}{netGrowth}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {totalHires} hires, {totalTerminations} exits
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
                <p className="text-2xl font-medium">{totalReviews}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {totalPromotions} promotions
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance Trends</TabsTrigger>
          <TabsTrigger value="workforce">Workforce Analytics</TabsTrigger>
          <TabsTrigger value="reviews">Review Actions</TabsTrigger>
          <TabsTrigger value="departments">Department Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Trends Over Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Score Trends
              </CardTitle>
              <CardDescription>
                Average performance scores and employee counts over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      domain={[7, 9]}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="averageScore" 
                      stroke="hsl(var(--chart-1))" 
                      strokeWidth={3}
                      name="Average Score"
                      dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* High vs Low Performers */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Distribution Over Time</CardTitle>
              <CardDescription>
                Tracking of high performers (9.0+) vs low performers (below 5.0)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="highPerformers" 
                      stackId="1"
                      stroke="#22c55e" 
                      fill="#22c55e"
                      fillOpacity={0.6}
                      name="High Performers"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="lowPerformers" 
                      stackId="2"
                      stroke="#ef4444" 
                      fill="#ef4444"
                      fillOpacity={0.6}
                      name="Low Performers"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workforce" className="space-y-6">
          {/* Terminations and Hires */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserX className="h-5 w-5" />
                Workforce Changes
              </CardTitle>
              <CardDescription>
                Monthly terminations, new hires, and net workforce growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={terminationsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="newHires" fill="#22c55e" name="New Hires" />
                    <Bar dataKey="voluntary" fill="#f59e0b" name="Voluntary Exits" />
                    <Bar dataKey="involuntary" fill="#ef4444" name="Involuntary Exits" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Performance Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Current Performance Distribution</CardTitle>
              <CardDescription>
                Breakdown of employees by performance score ranges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={performanceDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ range, percentage }) => `${range} (${percentage}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {performanceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  {performanceDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm font-medium">{item.range}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{item.count} employees</p>
                        <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          {/* Review Actions Over Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                HR Review Actions
              </CardTitle>
              <CardDescription>
                Monthly breakdown of performance reviews, disciplinary actions, and promotions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reviewActionsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="performanceReviews" fill="hsl(var(--chart-1))" name="Performance Reviews" />
                    <Bar dataKey="promotions" fill="#22c55e" name="Promotions" />
                    <Bar dataKey="disciplinaryActions" fill="#f59e0b" name="Disciplinary Actions" />
                    <Bar dataKey="warnings" fill="#ef4444" name="Warnings" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          {/* Department Performance Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Department Performance Comparison</CardTitle>
              <CardDescription>
                Average performance scores and employee satisfaction by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      type="number"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 10]}
                    />
                    <YAxis 
                      type="category"
                      dataKey="department"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      width={80}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="averageScore" fill="hsl(var(--chart-1))" name="Average Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Department Stats Table */}
          <Card>
            <CardHeader>
              <CardTitle>Department Statistics</CardTitle>
              <CardDescription>
                Detailed breakdown of performance metrics by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentData.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{dept.department}</h4>
                      <p className="text-sm text-muted-foreground">{dept.employees} employees</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Avg Score</p>
                        <Badge variant={dept.averageScore >= 8.5 ? "default" : dept.averageScore >= 7.5 ? "secondary" : "destructive"}>
                          {dept.averageScore}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Satisfaction</p>
                        <Badge variant={dept.satisfaction >= 90 ? "default" : dept.satisfaction >= 85 ? "secondary" : "destructive"}>
                          {dept.satisfaction}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}