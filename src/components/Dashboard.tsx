import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { AlertTriangle, Users, TrendingUp, FileText, CheckCircle, UserCheck, Clock, MessageCircle, Calendar, UserX, Star, AlertCircle, ChevronRight, Settings } from 'lucide-react';

// Mock data
const dashboardData = {
  totalEmployees: 247,
  averagePerformance: 8.2,
  departmentBreakdown: {
    engineering: 89,
    marketing: 34,
    sales: 67,
    hr: 23,
    finance: 34
  },
  actionAlerts: [
    { id: 1, name: 'Sarah Johnson', type: 'review', issue: 'Performance review overdue', urgency: 'high', department: 'Engineering', daysOverdue: 15 },
    { id: 2, name: 'Mike Chen', type: 'review', issue: 'Quarterly check-in needed', urgency: 'medium', department: 'Sales', daysOverdue: 5 },
    { id: 3, name: 'Alex Rodriguez', type: 'performance', issue: 'Below expectations for 3 months', urgency: 'high', department: 'Marketing', score: 4.2 },
    { id: 4, name: 'Emma Davis', type: 'review', issue: 'Annual review pending', urgency: 'low', department: 'Finance', daysOverdue: 2 },
  ],
  upcomingReviews: [
    { id: 1, name: 'Jessica Park', department: 'Engineering', type: 'Annual Review', dueDate: '2025-08-05', daysUntil: 7 },
    { id: 2, name: 'Robert Kim', department: 'Sales', type: 'Quarterly Check-in', dueDate: '2025-08-08', daysUntil: 10 },
    { id: 3, name: 'Maria González', department: 'Marketing', type: 'Performance Review', dueDate: '2025-08-12', daysUntil: 14 },
    { id: 4, name: 'Thomas Lee', department: 'HR', type: 'Probation Review', dueDate: '2025-08-15', daysUntil: 17 },
  ],
  quickStats: {
    activeEmployees: 247,
    onLeave: 12,
    newHires: 8,
    pendingReviews: 23,
    upcomingApprovals: 5,
    performanceIssues: 7,
    topPerformers: 45,
  },
  performanceTrends: {
    thisMonth: 8.2,
    lastMonth: 7.9,
    percentChange: 3.8
  }
};

interface DashboardProps {
  onNavigateToProfile?: () => void;
  onNavigateToReport?: () => void;
  onNavigateToPendingActions?: () => void;
  onNavigateToChatbot?: () => void;
  onNavigateToCalendar?: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToDirectory?: () => void;
}

export function Dashboard({ onNavigateToProfile, onNavigateToReport, onNavigateToPendingActions, onNavigateToChatbot, onNavigateToCalendar, onNavigateToSettings, onNavigateToDirectory }: DashboardProps) {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'review': return <Clock className="h-4 w-4" />;
      case 'performance': return <AlertTriangle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getDaysUntilColor = (days: number) => {
    if (days <= 7) return 'text-destructive';
    if (days <= 14) return 'text-yellow-600';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your team's performance and pending actions
        </p>
      </div>

      {/* Key Metrics - Enhanced Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl">{dashboardData.totalEmployees}</div>
              <div className="flex items-center gap-2">
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{dashboardData.quickStats.newHires} this month
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {dashboardData.quickStats.onLeave} on leave
              </div>
            </div>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Performance Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl">{dashboardData.averagePerformance}/10</div>
              <Progress value={dashboardData.averagePerformance * 10} className="h-2" />
              <div className="flex items-center gap-2">
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{dashboardData.performanceTrends.percentChange}% from last month
                </div>
              </div>
            </div>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-600" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Action Items</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl">{dashboardData.actionAlerts.length + dashboardData.quickStats.upcomingApprovals}</div>
              <div className="space-y-1">
                <div className="text-xs text-destructive">
                  {dashboardData.actionAlerts.filter(a => a.urgency === 'high').length} high priority
                </div>
                <div className="text-xs text-muted-foreground">
                  {dashboardData.quickStats.upcomingApprovals} pending approvals
                </div>
              </div>
            </div>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Upcoming Reviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl">{dashboardData.upcomingReviews.length}</div>
              <div className="space-y-1">
                <div className="text-xs text-yellow-600">
                  {dashboardData.upcomingReviews.filter(r => r.daysUntil <= 7).length} due this week
                </div>
                <div className="text-xs text-muted-foreground">
                  Next: {dashboardData.upcomingReviews[0].name}
                </div>
              </div>
            </div>
          </CardContent>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600" />
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Performance Issues - Enhanced */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Performance Issues & Action Required
                </CardTitle>
                <CardDescription>
                  Employees requiring immediate attention or review
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onNavigateToPendingActions}
              >
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {dashboardData.actionAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {getActionIcon(alert.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="truncate">{alert.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {alert.department}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.issue}</p>
                    {alert.daysOverdue && (
                      <p className="text-xs text-destructive">
                        {alert.daysOverdue} days overdue
                      </p>
                    )}
                    {alert.score && (
                      <p className="text-xs text-muted-foreground">
                        Performance: {alert.score}/10
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getUrgencyColor(alert.urgency) as any} className="text-xs">
                    {alert.urgency}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={onNavigateToProfile}
                  >
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Reviews
            </CardTitle>
            <CardDescription>
              Scheduled performance evaluations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {dashboardData.upcomingReviews.map((review) => (
              <div key={review.id} className="space-y-2 p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="truncate">{review.name}</p>
                  <Badge variant="outline" className="text-xs">
                    {review.department}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{review.type}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{review.dueDate}</p>
                    <p className={`text-xs ${getDaysUntilColor(review.daysUntil)}`}>
                      {review.daysUntil} days
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline" size="sm">
              View All Reviews
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - Enhanced */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions & Critical Operations</CardTitle>
          <CardDescription>
            Frequently used tools and emergency actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <Button 
              className="justify-start h-auto p-4" 
              variant="ghost"
              onClick={onNavigateToReport}
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-600" />
                <div className="text-left">
                  <div>Performance Reports</div>
                  <div className="text-xs text-muted-foreground">Generate & review reports</div>
                </div>
              </div>
            </Button>
            
            <Button 
              className="justify-start h-auto p-4" 
              variant="ghost"
              onClick={onNavigateToPendingActions}
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div className="text-left">
                  <div>Pending Approvals</div>
                  <div className="text-xs text-muted-foreground">{dashboardData.quickStats.upcomingApprovals} items waiting</div>
                </div>
              </div>
            </Button>

            <Button 
              className="justify-start h-auto p-4" 
              variant="ghost"
              onClick={onNavigateToDirectory}
            >
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-purple-600" />
                <div className="text-left">
                  <div>Employee Directory</div>
                  <div className="text-xs text-muted-foreground">{dashboardData.totalEmployees} active employees</div>
                </div>
              </div>
            </Button>

            <Button className="justify-start h-auto p-4" variant="ghost">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                <div className="text-left">
                  <div>Analytics Dashboard</div>
                  <div className="text-xs text-muted-foreground">Performance insights</div>
                </div>
              </div>
            </Button>

            <Button className="justify-start h-auto p-4" variant="ghost">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-indigo-600" />
                <div className="text-left">
                  <div>Time & Attendance</div>
                  <div className="text-xs text-muted-foreground">Track work hours</div>
                </div>
              </div>
            </Button>

            <Button 
              className="justify-start h-auto p-4" 
              variant="ghost"
              onClick={onNavigateToChatbot}
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-teal-600" />
                <div className="text-left">
                  <div>HR Assistant</div>
                  <div className="text-xs text-muted-foreground">Get instant help</div>
                </div>
              </div>
            </Button>

            <Button 
              className="justify-start h-auto p-4" 
              variant="ghost"
              onClick={onNavigateToCalendar}
            >
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-pink-600" />
                <div className="text-left">
                  <div>HR Calendar</div>
                  <div className="text-xs text-muted-foreground">Schedule & events</div>
                </div>
              </div>
            </Button>

            <Button 
              className="justify-start h-auto p-4" 
              variant="ghost"
              onClick={onNavigateToSettings}
            >
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-gray-600" />
                <div className="text-left">
                  <div>HR Settings</div>
                  <div className="text-xs text-muted-foreground">Configure system</div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Team Insights */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates across your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 bg-green-500 rounded-full flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Jennifer Smith completed annual review</span>
                    <span className="text-xs text-muted-foreground">2h ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">David Wilson started onboarding</span>
                    <span className="text-xs text-muted-foreground">4h ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 bg-yellow-500 rounded-full flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">2 performance improvement plans initiated</span>
                    <span className="text-xs text-muted-foreground">1d ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-2 w-2 bg-green-500 rounded-full flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Marketing team Q4 reviews completed</span>
                    <span className="text-xs text-muted-foreground">2d ago</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Overview</CardTitle>
            <CardDescription>
              Department breakdown and insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(dashboardData.departmentBreakdown).map(([dept, count]) => (
                <div key={dept} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-xs capitalize">{dept[0]}</span>
                    </div>
                    <span className="capitalize">{dept}</span>
                  </div>
                  <div className="text-sm">{count}</div>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span>Top Performers</span>
                  <span className="text-green-600">{dashboardData.quickStats.topPerformers}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Need Attention</span>
                  <span className="text-destructive">{dashboardData.quickStats.performanceIssues}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}