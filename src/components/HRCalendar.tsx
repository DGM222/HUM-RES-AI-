import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Users,
  UserX,
  FileText,
  AlertTriangle,
  Star,
  Coffee,
  Briefcase,
  Plus,
  Filter,
  Download
} from 'lucide-react';

// Mock calendar data
const calendarEvents = [
  {
    id: 1,
    title: 'Performance Review - Sarah Johnson',
    type: 'review',
    employee: 'Sarah Johnson',
    department: 'Engineering',
    date: '2025-08-05',
    time: '10:00 AM',
    duration: '1 hour',
    status: 'scheduled',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Termination Meeting - Alex Rodriguez',
    type: 'termination',
    employee: 'Alex Rodriguez',
    department: 'Marketing',
    date: '2025-08-06',
    time: '2:00 PM',
    duration: '30 minutes',
    status: 'scheduled',
    priority: 'high'
  },
  {
    id: 3,
    title: 'Team Meeting - Engineering',
    type: 'meeting',
    department: 'Engineering',
    date: '2025-08-07',
    time: '9:00 AM',
    duration: '2 hours',
    status: 'scheduled',
    priority: 'medium'
  },
  {
    id: 4,
    title: 'New Employee Orientation',
    type: 'orientation',
    employee: 'David Wilson',
    department: 'Sales',
    date: '2025-08-08',
    time: '9:00 AM',
    duration: '4 hours',
    status: 'scheduled',
    priority: 'medium'
  },
  {
    id: 5,
    title: 'Quarterly Review - Maria González',
    type: 'review',
    employee: 'Maria González',
    department: 'Marketing',
    date: '2025-08-09',
    time: '11:00 AM',
    duration: '1 hour',
    status: 'scheduled',
    priority: 'medium'
  },
  {
    id: 6,
    title: 'Exit Interview - Lisa Chen',
    type: 'exit',
    employee: 'Lisa Chen',
    department: 'Finance',
    date: '2025-08-12',
    time: '3:00 PM',
    duration: '45 minutes',
    status: 'scheduled',
    priority: 'high'
  },
  {
    id: 7,
    title: 'HR Training Session',
    type: 'training',
    department: 'All Departments',
    date: '2025-08-14',
    time: '2:00 PM',
    duration: '3 hours',
    status: 'scheduled',
    priority: 'medium'
  },
  {
    id: 8,
    title: 'Performance Review - Robert Kim',
    type: 'review',
    employee: 'Robert Kim',
    department: 'Sales',
    date: '2025-08-15',
    time: '1:00 PM',
    duration: '1 hour',
    status: 'scheduled',
    priority: 'medium'
  },
  {
    id: 9,
    title: 'Disciplinary Meeting - Thomas Lee',
    type: 'disciplinary',
    employee: 'Thomas Lee',
    department: 'HR',
    date: '2025-08-16',
    time: '10:30 AM',
    duration: '1 hour',
    status: 'scheduled',
    priority: 'high'
  },
  {
    id: 10,
    title: 'Monthly HR Metrics Review',
    type: 'meeting',
    department: 'HR',
    date: '2025-08-19',
    time: '4:00 PM',
    duration: '2 hours',
    status: 'scheduled',
    priority: 'low'
  }
];

const eventTypes = {
  review: { color: 'bg-blue-500', icon: FileText, label: 'Performance Review' },
  termination: { color: 'bg-red-500', icon: UserX, label: 'Termination' },
  meeting: { color: 'bg-green-500', icon: Users, label: 'Meeting' },
  orientation: { color: 'bg-purple-500', icon: Star, label: 'Orientation' },
  exit: { color: 'bg-orange-500', icon: Coffee, label: 'Exit Interview' },
  training: { color: 'bg-indigo-500', icon: Briefcase, label: 'Training' },
  disciplinary: { color: 'bg-yellow-500', icon: AlertTriangle, label: 'Disciplinary' }
};

interface HRCalendarProps {
  onNavigateToProfile?: () => void;
}

export function HRCalendar({ onNavigateToProfile }: HRCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 1)); // August 2025
  const [view, setView] = useState<'month' | 'week'>('month');
  const [selectedEvent, setSelectedEvent] = useState<typeof calendarEvents[0] | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setDate(prev.getDate() - 7);
      } else {
        newDate.setDate(prev.getDate() + 7);
      }
      return newDate;
    });
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return calendarEvents.filter(event => event.date === dateString);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    startOfWeek.setDate(date.getDate() - dayOfWeek);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  const getEventTypeIcon = (type: string) => {
    const eventType = eventTypes[type as keyof typeof eventTypes];
    if (!eventType) return FileText;
    return eventType.icon;
  };

  const getEventTypeColor = (type: string) => {
    const eventType = eventTypes[type as keyof typeof eventTypes];
    if (!eventType) return 'bg-gray-500';
    return eventType.color;
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Header with day names */}
        {dayNames.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} className="h-24 p-1" />;
          }
          
          const events = getEventsForDate(day);
          const today = isToday(day);
          
          return (
            <div 
              key={day.toISOString()} 
              className={`h-24 p-1 border border-border hover:bg-muted/50 transition-colors ${
                today ? 'bg-primary/5 border-primary/20' : ''
              }`}
            >
              <div className={`text-sm mb-1 ${today ? 'font-medium text-primary' : ''}`}>
                {day.getDate()}
              </div>
              <div className="space-y-1">
                {events.slice(0, 2).map(event => (
                  <div
                    key={event.id}
                    className={`text-xs p-1 rounded text-white cursor-pointer hover:opacity-80 ${getEventTypeColor(event.type)}`}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="truncate">{event.title}</div>
                  </div>
                ))}
                {events.length > 2 && (
                  <div className="text-xs text-muted-foreground">
                    +{events.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Header with day names and dates */}
        {weekDays.map(day => (
          <div key={day.toISOString()} className="p-2 text-center border-b">
            <div className="text-sm font-medium text-muted-foreground">
              {dayNames[day.getDay()]}
            </div>
            <div className={`text-lg ${isToday(day) ? 'font-medium text-primary' : ''}`}>
              {day.getDate()}
            </div>
          </div>
        ))}
        
        {/* Time slots */}
        <div className="col-span-7 grid grid-cols-7 gap-1">
          {weekDays.map(day => {
            const events = getEventsForDate(day);
            
            return (
              <div key={day.toISOString()} className="min-h-96 p-2 border border-border">
                <div className="space-y-2">
                  {events.map(event => (
                    <div
                      key={event.id}
                      className={`p-2 rounded text-white cursor-pointer hover:opacity-80 ${getEventTypeColor(event.type)}`}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="text-sm font-medium">{formatTime(event.time)}</div>
                      <div className="text-xs">{event.title}</div>
                      {event.duration && (
                        <div className="text-xs opacity-80">{event.duration}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>HR Calendar</h1>
          <p className="text-muted-foreground">
            Manage employee reviews, meetings, and HR events
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => view === 'month' ? navigateMonth('prev') : navigateWeek('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-medium min-w-48 text-center">
              {view === 'month' 
                ? `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                : `Week of ${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`
              }
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => view === 'month' ? navigateMonth('next') : navigateWeek('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
        </div>
        
        <Tabs value={view} onValueChange={(value) => setView(value as 'month' | 'week')}>
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Event Type Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Event Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {Object.entries(eventTypes).map(([type, config]) => (
              <div key={type} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded ${config.color}`} />
                <span className="text-sm">{config.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card>
        <CardContent className="p-4">
          {view === 'month' ? renderMonthView() : renderWeekView()}
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>
            Next 7 days of scheduled HR activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {calendarEvents.slice(0, 5).map(event => {
              const IconComponent = getEventTypeIcon(event.type);
              return (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${getEventTypeColor(event.type)}`}>
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                        {event.employee && (
                          <>
                            <span>•</span>
                            <span>{event.employee}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={event.priority === 'high' ? 'destructive' : event.priority === 'medium' ? 'default' : 'secondary'}>
                      {event.priority}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={onNavigateToProfile}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Event Details Modal (simplified) */}
      {selectedEvent && (
        <Card className="fixed inset-4 z-50 bg-background border shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedEvent.title}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(null)}>
                ×
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <p>{new Date(selectedEvent.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Time</label>
                  <p>{selectedEvent.time}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Duration</label>
                  <p>{selectedEvent.duration}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <p>{eventTypes[selectedEvent.type as keyof typeof eventTypes]?.label}</p>
                </div>
                {selectedEvent.employee && (
                  <div>
                    <label className="text-sm font-medium">Employee</label>
                    <p>{selectedEvent.employee}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium">Department</label>
                  <p>{selectedEvent.department}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={onNavigateToProfile}>View Profile</Button>
                <Button variant="outline">Edit Event</Button>
                <Button variant="outline">Cancel Event</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}