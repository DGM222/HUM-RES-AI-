import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { 
  Calendar, 
  User, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Users, 
  Target, 
  Award,
  FileText,
  Download,
  Printer,
  Star,
  ThumbsUp,
  Minus
} from 'lucide-react';
import { useState } from 'react';

// Mock performance data
const performanceData = {
  employee: {
    name: 'Sarah Johnson',
    id: 'EMP001',
    role: 'Senior Software Engineer',
    department: 'Engineering',
    manager: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e7d55f?w=150&h=150&fit=crop&crop=face',
    reviewPeriod: {
      start: '2024-07-01',
      end: '2024-12-31',
      quarter: 'Q3-Q4 2024'
    }
  },
  
  overallScore: 7.8,
  overallRating: 'Meets Expectations',
  
  aiSummary: {
    overview: 'Sarah has demonstrated consistent performance with notable strengths in technical execution and team collaboration. While there was a temporary dip in performance during Q2, she has shown remarkable recovery and improvement in recent months.',
    keyAchievements: [
      'Successfully led the API integration project, delivering 2 weeks ahead of schedule',
      'Mentored 3 junior developers, improving team productivity by 15%',
      'Contributed to 5 major feature releases with zero critical bugs',
      'Improved code review turnaround time by 40%'
    ],
    areasForImprovement: [
      'Time management during high-pressure periods needs attention',
      'Client communication skills could be enhanced',
      'Documentation practices require more consistency'
    ],
    recommendation: 'Recommend for continued employment with focus on leadership development opportunities'
  },
  
  scoreBreakdown: {
    attendance: {
      score: 9.2,
      details: {
        daysPresent: 118,
        totalDays: 126,
        lateArrivals: 3,
        earlyDepartures: 2,
        sickDays: 5,
        personalDays: 3
      }
    },
    tasks: {
      score: 7.5,
      details: {
        tasksCompleted: 47,
        tasksAssigned: 52,
        onTimeCompletion: 38,
        qualityRating: 8.2,
        complexityHandled: 'High'
      }
    },
    behavior: {
      score: 8.1,
      details: {
        teamwork: 8.5,
        communication: 7.2,
        initiative: 8.8,
        professionalism: 8.0,
        adaptability: 7.9
      }
    },
    goals: {
      score: 7.2,
      details: {
        goalsSet: 8,
        goalsAchieved: 6,
        goalsInProgress: 2,
        goalQuality: 'Above Average'
      }
    }
  },
  
  monthlyTrends: [
    { month: 'Jul', attendance: 9.5, tasks: 7.2, behavior: 8.0, overall: 8.2 },
    { month: 'Aug', attendance: 8.8, tasks: 7.0, behavior: 7.8, overall: 7.9 },
    { month: 'Sep', attendance: 9.0, tasks: 7.3, behavior: 8.2, overall: 8.2 },
    { month: 'Oct', attendance: 9.3, tasks: 7.8, behavior: 8.3, overall: 8.5 },
    { month: 'Nov', attendance: 9.1, tasks: 7.6, behavior: 8.0, overall: 8.2 },
    { month: 'Dec', attendance: 9.2, tasks: 7.5, behavior: 8.1, overall: 7.8 }
  ],
  
  hrComments: {
    existing: [
      {
        date: '2024-12-20',
        author: 'Jennifer Martinez - HR Manager',
        comment: 'Sarah has shown excellent improvement since her performance review. Her technical contributions have been outstanding.',
        type: 'positive'
      },
      {
        date: '2024-11-15',
        author: 'David Chen - Direct Manager',
        comment: 'Leadership potential is evident. Recommend for senior leadership training program.',
        type: 'neutral'
      }
    ]
  }
};

const radialData = [
  { name: 'Attendance', value: performanceData.scoreBreakdown.attendance.score * 10, fill: '#22c55e' },
  { name: 'Tasks', value: performanceData.scoreBreakdown.tasks.score * 10, fill: '#3b82f6' },
  { name: 'Behavior', value: performanceData.scoreBreakdown.behavior.score * 10, fill: '#f59e0b' },
  { name: 'Goals', value: performanceData.scoreBreakdown.goals.score * 10, fill: '#8b5cf6' }
];

export function PerformanceReport() {
  const [newHrComment, setNewHrComment] = useState('');

  const getScoreColor = (score: number) => {
    if (score >= 8.5) return 'text-green-600';
    if (score >= 7.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 8.5) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (score >= 7.0) return <Minus className="h-4 w-4 text-yellow-600" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  const getRatingBadge = (rating: string) => {
    const variant = rating.includes('Exceeds') ? 'default' : 
                   rating.includes('Meets') ? 'secondary' : 'destructive';
    return <Badge variant={variant}>{rating}</Badge>;
  };

  const addHrComment = () => {
    if (newHrComment.trim()) {
      console.log('Adding HR comment:', newHrComment);
      setNewHrComment('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={performanceData.employee.avatar} alt={performanceData.employee.name} />
                <AvatarFallback className="text-lg">
                  {performanceData.employee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl">{performanceData.employee.name}</h1>
                  <Badge variant="outline">{performanceData.employee.id}</Badge>
                </div>
                <p className="text-lg text-muted-foreground">{performanceData.employee.role}</p>
                <p className="text-sm text-muted-foreground">{performanceData.employee.department}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>Manager: {performanceData.employee.manager}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2 justify-end">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Review Period: {performanceData.employee.reviewPeriod.quarter}</span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-3xl font-semibold">{performanceData.overallScore}</span>
                <span className="text-sm text-muted-foreground">/10</span>
              </div>
              {getRatingBadge(performanceData.overallRating)}
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print Report
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* AI Summary */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                AI Performance Analysis
              </CardTitle>
              <CardDescription>
                Automated insights generated from performance data and feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Executive Summary</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {performanceData.aiSummary.overview}
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-green-600" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {performanceData.aiSummary.keyAchievements.map((achievement, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4 text-yellow-600" />
                    Areas for Development
                  </h4>
                  <ul className="space-y-2">
                    {performanceData.aiSummary.areasForImprovement.map((area, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <AlertTriangle className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Final Recommendation</h4>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-muted-foreground">
                    {performanceData.aiSummary.recommendation}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Trends */}
          <Card>
            <CardHeader>
              <CardTitle>6-Month Performance Trends</CardTitle>
              <CardDescription>
                Monthly breakdown of key performance areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData.monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Bar dataKey="attendance" fill="#22c55e" name="Attendance" />
                  <Bar dataKey="tasks" fill="#3b82f6" name="Tasks" />
                  <Bar dataKey="behavior" fill="#f59e0b" name="Behavior" />
                  <Bar dataKey="overall" fill="#8b5cf6" name="Overall" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Score Breakdown */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Score Overview</CardTitle>
              <CardDescription>
                Visual breakdown of performance categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-6">
                <ResponsiveContainer width={200} height={200}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={radialData}>
                    <RadialBar dataKey="value" cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                {Object.entries(performanceData.scoreBreakdown).map(([category, data]) => (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize">{category}</span>
                      <div className="flex items-center gap-2">
                        {getScoreIcon(data.score)}
                        <span className={`text-sm font-semibold ${getScoreColor(data.score)}`}>
                          {data.score}/10
                        </span>
                      </div>
                    </div>
                    <Progress value={data.score * 10} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Attendance Details */}
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Attendance
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Days Present:</span>
                    <span>{performanceData.scoreBreakdown.attendance.details.daysPresent}/{performanceData.scoreBreakdown.attendance.details.totalDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Late Arrivals:</span>
                    <span>{performanceData.scoreBreakdown.attendance.details.lateArrivals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sick Days:</span>
                    <span>{performanceData.scoreBreakdown.attendance.details.sickDays}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Task Performance */}
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Task Performance
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completion Rate:</span>
                    <span>{Math.round((performanceData.scoreBreakdown.tasks.details.tasksCompleted / performanceData.scoreBreakdown.tasks.details.tasksAssigned) * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">On-Time Delivery:</span>
                    <span>{Math.round((performanceData.scoreBreakdown.tasks.details.onTimeCompletion / performanceData.scoreBreakdown.tasks.details.tasksCompleted) * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quality Rating:</span>
                    <span>{performanceData.scoreBreakdown.tasks.details.qualityRating}/10</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Behavior Breakdown */}
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Behavioral Metrics
                </h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(performanceData.scoreBreakdown.behavior.details).map(([behavior, score]) => (
                    <div key={behavior} className="flex justify-between">
                      <span className="text-muted-foreground capitalize">{behavior}:</span>
                      <span>{score}/10</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* HR Comments */}
      <Card>
        <CardHeader>
          <CardTitle>HR Comments & Notes</CardTitle>
          <CardDescription>
            Additional observations and feedback from HR and management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Existing Comments */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Review Comments</h4>
            {performanceData.hrComments.existing.map((comment, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{comment.author}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{comment.comment}</p>
              </div>
            ))}
          </div>

          <Separator />

          {/* Add New Comment */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Add HR Comment</h4>
            <Textarea
              placeholder="Add additional observations, recommendations, or notes..."
              value={newHrComment}
              onChange={(e) => setNewHrComment(e.target.value)}
              className="min-h-20"
            />
            <Button onClick={addHrComment} className="w-full">
              Add Comment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}