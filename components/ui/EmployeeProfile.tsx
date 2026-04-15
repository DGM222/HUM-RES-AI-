import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  Star
} from 'lucide-react';

// Mock employee data
const employeeData = {
  id: 'EMP001',
  name: 'Sarah Johnson',
  role: 'Senior Software Engineer',
  department: 'Engineering',
  email: 'sarah.johnson@company.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  hireDate: '2021-03-15',
  education: 'MS Computer Science, Stanford University',
  manager: 'David Chen',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e7d55f?w=150&h=150&fit=crop&crop=face',
  
  performanceData: [
    { month: 'Jan', score: 8.5, target: 8.0 },
    { month: 'Feb', score: 7.8, target: 8.0 },
    { month: 'Mar', score: 8.2, target: 8.0 },
    { month: 'Apr', score: 7.5, target: 8.0 },
    { month: 'May', score: 7.2, target: 8.0 },
    { month: 'Jun', score: 6.8, target: 8.0 },
    { month: 'Jul', score: 7.0, target: 8.0 },
    { month: 'Aug', score: 7.3, target: 8.0 },
    { month: 'Sep', score: 7.6, target: 8.0 },
    { month: 'Oct', score: 7.9, target: 8.0 },
    { month: 'Nov', score: 8.1, target: 8.0 },
    { month: 'Dec', score: 8.0, target: 8.0 }
  ],
  
  currentScore: 8.0,
  trend: 'improving',
  
  aiSummary: {
    overall: 'Sarah demonstrates strong technical skills and consistent performance recovery. After a challenging period from April to July, she has shown significant improvement and is now meeting performance targets.',
    strengths: [
      'Excellent problem-solving abilities',
      'Strong collaboration with team members',
      'Consistent code quality and documentation',
      'Takes initiative on complex projects'
    ],
    concerns: [
      'Experienced performance dip during Q2',
      'Occasionally misses deadlines during high-pressure periods',
      'Could improve communication with stakeholders'
    ],
    recommendation: 'Keep - Strong recovery trajectory and valuable team member'
  },
  
  supervisorNotes: [
    {
      date: '2024-12-15',
      author: 'David Chen',
      note: 'Sarah has shown excellent improvement over the past quarter. Her work on the new API integration was outstanding.',
      type: 'positive'
    },
    {
      date: '2024-11-20',
      author: 'David Chen',
      note: 'Discussed time management strategies. Sarah is implementing new workflows to meet deadlines more consistently.',
      type: 'neutral'
    },
    {
      date: '2024-10-10',
      author: 'David Chen',
      note: 'Performance improvement plan initiated. Sarah is receptive to feedback and committed to improvement.',
      type: 'concern'
    }
  ]
};

export function EmployeeProfile() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getNoteTypeIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'concern':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleActionClick = (action: string) => {
    setSelectedAction(action);
    console.log(`Action selected: ${action} for employee ${employeeData.name}`);
  };

  const addNote = () => {
    if (newNote.trim()) {
      console.log('Adding note:', newNote);
      setNewNote('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Employee Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={employeeData.avatar} alt={employeeData.name} />
                <AvatarFallback className="text-xl">
                  {employeeData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl">{employeeData.name}</h1>
                  <Badge variant="outline">{employeeData.id}</Badge>
                </div>
                <p className="text-lg text-muted-foreground">{employeeData.role}</p>
                <p className="text-sm text-muted-foreground">{employeeData.department}</p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {employeeData.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {employeeData.phone}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {employeeData.location}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground">Current Score:</span>
                <div className="flex items-center gap-1">
                  <span className="text-2xl">{employeeData.currentScore}</span>
                  <span className="text-sm text-muted-foreground">/10</span>
                  {getTrendIcon(employeeData.trend)}
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Hired: {new Date(employeeData.hireDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance Trend</CardTitle>
          <CardDescription>
            Performance scores over the last 12 months (Target: 8.0)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={employeeData.performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#94a3b8" 
                strokeDasharray="5 5"
                name="Target"
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Performance Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* AI Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              AI Performance Analysis
            </CardTitle>
            <CardDescription>
              Generated insights based on performance data and feedback
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Overall Assessment</h4>
              <p className="text-sm text-muted-foreground">{employeeData.aiSummary.overall}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Key Strengths</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {employeeData.aiSummary.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Areas for Improvement</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {employeeData.aiSummary.concerns.map((concern, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertTriangle className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                    {concern}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-2 border-t">
              <h4 className="text-sm font-medium mb-2">Recommendation</h4>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {employeeData.aiSummary.recommendation}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Supervisor Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Supervisor Notes</CardTitle>
            <CardDescription>
              Recent feedback and observations from {employeeData.manager}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="add">Add Note</TabsTrigger>
              </TabsList>
              
              <TabsContent value="history" className="space-y-4">
                <div className="max-h-60 overflow-y-auto space-y-3">
                  {employeeData.supervisorNotes.map((note, index) => (
                    <div key={index} className="p-3 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getNoteTypeIcon(note.type)}
                          <span className="text-sm font-medium">{note.author}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(note.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{note.note}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="add" className="space-y-4">
                <Textarea
                  placeholder="Add a note about this employee's performance..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="min-h-24"
                />
                <Button onClick={addNote} className="w-full">
                  Add Note
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Decision</CardTitle>
          <CardDescription>
            Take action based on the employee's performance and analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              variant={selectedAction === 'keep' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => handleActionClick('keep')}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Keep
            </Button>
            <Button 
              variant={selectedAction === 'review' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => handleActionClick('review')}
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Review
            </Button>
            <Button 
              variant={selectedAction === 'fire' ? 'destructive' : 'outline'}
              className="flex-1"
              onClick={() => handleActionClick('fire')}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Fire
            </Button>
          </div>
          
          {selectedAction && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>Action Selected:</strong> {selectedAction.charAt(0).toUpperCase() + selectedAction.slice(1)} - {employeeData.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                This action will be logged and require manager approval before implementation.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}