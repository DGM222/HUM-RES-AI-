import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { Avatar } from './avatar';
import { Separator } from './separator';
import { 
  Bell, 
  Brain, 
  MessageSquare, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  Eye,
  MoreHorizontal,
  Star,
  UserX,
  FileText,
  Calendar,
  Mail,
  Filter,
  Search
} from 'lucide-react';
import { Input } from './input';

// Mock data
const notificationsData = [
  {
    id: 1,
    type: 'system',
    title: 'Quarterly Review Period Started',
    message: 'Q4 2024 performance reviews are now open. 23 employees need to be reviewed.',
    timestamp: '2 hours ago',
    read: false,
    priority: 'high',
    actionRequired: true
  },
  {
    id: 2,
    type: 'approval',
    title: 'Pending Approval: Sarah Johnson Termination',
    message: 'Termination request for Sarah Johnson requires your approval.',
    timestamp: '4 hours ago',
    read: false,
    priority: 'high',
    actionRequired: true
  },
  {
    id: 3,
    type: 'system',
    title: 'New Employee Onboarding',
    message: 'David Wilson has completed day 1 onboarding checklist.',
    timestamp: '1 day ago',
    read: true,
    priority: 'medium',
    actionRequired: false
  },
  {
    id: 4,
    type: 'alert',
    title: 'Performance Alert',
    message: 'Alex Rodriguez has been below expectations for 3 consecutive months.',
    timestamp: '2 days ago',
    read: false,
    priority: 'high',
    actionRequired: true
  },
  {
    id: 5,
    type: 'system',
    title: 'Monthly Report Generated',
    message: 'November 2024 HR analytics report is ready for review.',
    timestamp: '3 days ago',
    read: true,
    priority: 'low',
    actionRequired: false
  }
];

const aiRecommendationsData = [
  {
    id: 1,
    type: 'review',
    employee: 'John Doe',
    department: 'Engineering',
    recommendation: 'Schedule Performance Review',
    reason: 'Performance has declined 15% over the last quarter. Last review was 8 months ago.',
    confidence: 92,
    urgency: 'high',
    timestamp: '1 hour ago',
    read: false,
    actions: ['Schedule Review', 'View Profile', 'Dismiss']
  },
  {
    id: 2,
    type: 'promotion',
    employee: 'Maria González',
    department: 'Marketing',
    recommendation: 'Consider for Promotion',
    reason: 'Consistently exceeds targets, shows leadership qualities, and has positive peer feedback.',
    confidence: 88,
    urgency: 'medium',
    timestamp: '3 hours ago',
    read: false,
    actions: ['Review for Promotion', 'View Profile', 'Dismiss']
  },
  {
    id: 3,
    type: 'training',
    employee: 'Robert Kim',
    department: 'Sales',
    recommendation: 'Additional Training Required',
    reason: 'Missing key sales targets and receiving customer complaints. Training could help improve performance.',
    confidence: 85,
    urgency: 'medium',
    timestamp: '1 day ago',
    read: true,
    actions: ['Assign Training', 'View Profile', 'Dismiss']
  },
  {
    id: 4,
    type: 'termination',
    employee: 'Lisa Chen',
    department: 'Finance',
    recommendation: 'Consider Termination',
    reason: 'Multiple policy violations and poor performance despite previous warnings and training.',
    confidence: 78,
    urgency: 'high',
    timestamp: '2 days ago',
    read: false,
    actions: ['Start Process', 'View Profile', 'Dismiss']
  }
];

const employeeMessagesData = [
  {
    id: 1,
    from: 'Jennifer Smith',
    department: 'Engineering',
    subject: 'Question about PTO Policy',
    preview: 'Hi, I wanted to clarify the new PTO rollover policy that was announced...',
    timestamp: '30 minutes ago',
    read: false,
    priority: 'normal',
    hasAttachment: false
  },
  {
    id: 2,
    from: 'Michael Brown',
    department: 'Sales',
    subject: 'HR Complaint - Workplace Harassment',
    preview: 'I need to report an incident that occurred during yesterday\'s team meeting...',
    timestamp: '2 hours ago',
    read: false,
    priority: 'urgent',
    hasAttachment: true
  },
  {
    id: 3,
    from: 'Emily Davis',
    department: 'Marketing',
    subject: 'Request for Flexible Work Arrangement',
    preview: 'I would like to request a flexible work schedule due to family circumstances...',
    timestamp: '1 day ago',
    read: true,
    priority: 'normal',
    hasAttachment: false
  },
  {
    id: 4,
    from: 'Thomas Wilson',
    department: 'Finance',
    subject: 'Benefits Enrollment Question',
    preview: 'I have a question about the health insurance options for the upcoming enrollment period...',
    timestamp: '2 days ago',
    read: true,
    priority: 'normal',
    hasAttachment: false
  },
  {
    id: 5,
    from: 'Sarah Martinez',
    department: 'HR',
    subject: 'Performance Review Self-Assessment',
    preview: 'I\'ve completed my self-assessment and wanted to discuss a few points before our meeting...',
    timestamp: '3 days ago',
    read: true,
    priority: 'normal',
    hasAttachment: true
  }
];

interface HRInboxProps {
  onNavigateToProfile?: () => void;
  onNavigateToPendingActions?: () => void;
}

export function HRInbox({ onNavigateToProfile, onNavigateToPendingActions }: HRInboxProps) {
  const [activeTab, setActiveTab] = useState('notifications');
  const [searchQuery, setSearchQuery] = useState('');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'system': return <Bell className="h-4 w-4 text-blue-600" />;
      case 'approval': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'alert': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'review': return <FileText className="h-4 w-4 text-blue-600" />;
      case 'promotion': return <Star className="h-4 w-4 text-yellow-600" />;
      case 'training': return <Brain className="h-4 w-4 text-purple-600" />;
      case 'termination': return <UserX className="h-4 w-4 text-red-600" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const unreadNotifications = notificationsData.filter(n => !n.read).length;
  const unreadRecommendations = aiRecommendationsData.filter(r => !r.read).length;
  const unreadMessages = employeeMessagesData.filter(m => !m.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>HR Inbox</h1>
          <p className="text-muted-foreground">
            Manage notifications, AI recommendations, and employee messages
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search messages..." 
              className="pl-9 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notifications" className="relative">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
            {unreadNotifications > 0 && (
              <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                {unreadNotifications}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="ai-recommendations" className="relative">
            <Brain className="h-4 w-4 mr-2" />
            AI Recommendations
            {unreadRecommendations > 0 && (
              <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                {unreadRecommendations}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="employee-messages" className="relative">
            <MessageSquare className="h-4 w-4 mr-2" />
            Employee Messages
            {unreadMessages > 0 && (
              <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                {unreadMessages}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>System Notifications</span>
                <Button variant="ghost" size="sm">
                  Mark All Read
                </Button>
              </CardTitle>
              <CardDescription>
                Important updates and alerts from the HR system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notificationsData.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors ${
                    !notification.read ? 'bg-blue-50/50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`truncate ${!notification.read ? 'font-medium' : ''}`}>
                        {notification.title}
                      </p>
                      <Badge variant={getPriorityColor(notification.priority) as any} className="text-xs">
                        {notification.priority}
                      </Badge>
                      {!notification.read && (
                        <div className="h-2 w-2 bg-blue-600 rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {notification.timestamp}
                      </div>
                      <div className="flex items-center gap-2">
                        {notification.actionRequired && (
                          <Button size="sm" onClick={onNavigateToPendingActions}>
                            Take Action
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Recommendations Tab */}
        <TabsContent value="ai-recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>AI-Powered Recommendations</span>
                <Button variant="ghost" size="sm">
                  Refresh
                </Button>
              </CardTitle>
              <CardDescription>
                Smart suggestions based on employee data and performance patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiRecommendationsData.map((recommendation) => (
                <div 
                  key={recommendation.id} 
                  className={`flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors ${
                    !recommendation.read ? 'bg-purple-50/50 border-purple-200' : ''
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getRecommendationIcon(recommendation.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <p className={`${!recommendation.read ? 'font-medium' : ''}`}>
                          {recommendation.recommendation}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {recommendation.department}
                        </Badge>
                        {!recommendation.read && (
                          <div className="h-2 w-2 bg-purple-600 rounded-full" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-2 mb-3">
                      <p className="text-sm">
                        <span className="font-medium">Employee:</span> {recommendation.employee}
                      </p>
                      <p className="text-sm text-muted-foreground">{recommendation.reason}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1">
                          <span>Confidence:</span>
                          <span className={getConfidenceColor(recommendation.confidence)}>
                            {recommendation.confidence}%
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {recommendation.timestamp}
                        </div>
                        <Badge variant={getPriorityColor(recommendation.urgency) as any} className="text-xs">
                          {recommendation.urgency}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {recommendation.actions.map((action, index) => (
                        <Button 
                          key={index}
                          size="sm" 
                          variant={index === 0 ? "default" : "outline"}
                          onClick={index === 1 ? onNavigateToProfile : undefined}
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employee Messages Tab */}
        <TabsContent value="employee-messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Employee Messages</span>
                <Button variant="ghost" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Compose
                </Button>
              </CardTitle>
              <CardDescription>
                Direct communications from employees requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {employeeMessagesData.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer ${
                    !message.read ? 'bg-green-50/50 border-green-200' : ''
                  }`}
                >
                  <Avatar className="h-10 w-10">
                    <div className="bg-muted flex items-center justify-center h-full w-full">
                      {message.from.split(' ').map(n => n[0]).join('')}
                    </div>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <p className={`${!message.read ? 'font-medium' : ''}`}>
                          {message.from}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {message.department}
                        </Badge>
                        {message.priority === 'urgent' && (
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        )}
                        {!message.read && (
                          <div className="h-2 w-2 bg-green-600 rounded-full" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className={`text-sm mb-2 ${!message.read ? 'font-medium' : ''}`}>
                      {message.subject}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {message.preview}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {message.hasAttachment && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <FileText className="h-3 w-3" />
                            Attachment
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          Reply
                        </Button>
                        <Button size="sm">
                          Open
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}