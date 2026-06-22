import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './select';
import { Input } from './input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from './dialog';
import { 
  Check, 
  X, 
  Filter, 
  Search, 
  Calendar, 
  User, 
  FileText, 
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import { Textarea } from './textarea';

// Mock data for pending actions
const pendingActionsData = [
  {
    id: 'PA001',
    employeeId: 'EMP001',
    employeeName: 'Sarah Johnson',
    employeeAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e7d55f?w=150&h=150&fit=crop&crop=face',
    actionType: 'fire',
    reason: 'Consistent poor performance despite multiple warnings and improvement plans',
    initiatedBy: 'David Chen',
    initiatorRole: 'Engineering Manager',
    dateSubmitted: '2024-12-20',
    reportDate: '2024-12-15',
    priority: 'high',
    status: 'pending',
    supportingDocuments: ['Performance Review Q4.pdf', 'Warning Letter.pdf'],
    additionalNotes: 'Employee has been under performance improvement plan for 3 months with minimal progress.'
  },
  {
    id: 'PA002',
    employeeId: 'EMP045',
    employeeName: 'Michael Rodriguez',
    employeeAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    actionType: 'review',
    reason: 'Exceptional performance - recommend for promotion consideration',
    initiatedBy: 'Jennifer Martinez',
    initiatorRole: 'HR Manager',
    dateSubmitted: '2024-12-18',
    reportDate: '2024-12-10',
    priority: 'medium',
    status: 'pending',
    supportingDocuments: ['Performance Review Q4.pdf'],
    additionalNotes: 'Outstanding contributions to the recent product launch. Team consistently praises leadership skills.'
  },
  {
    id: 'PA003',
    employeeId: 'EMP023',
    employeeName: 'Lisa Wang',
    employeeAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    actionType: 'review',
    reason: 'Attendance issues and missed deadlines',
    initiatedBy: 'Tom Anderson',
    initiatorRole: 'Product Manager',
    dateSubmitted: '2024-12-17',
    reportDate: '2024-12-12',
    priority: 'medium',
    status: 'pending',
    supportingDocuments: ['Attendance Report.pdf', 'Project Timeline.pdf'],
    additionalNotes: 'Recent personal issues may be affecting work performance. Recommend counseling support.'
  },
  {
    id: 'PA004',
    employeeId: 'EMP067',
    employeeName: 'Alex Thompson',
    employeeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    actionType: 'fire',
    reason: 'Violation of company policy regarding harassment',
    initiatedBy: 'Jennifer Martinez',
    initiatorRole: 'HR Manager',
    dateSubmitted: '2024-12-19',
    reportDate: '2024-12-16',
    priority: 'high',
    status: 'pending',
    supportingDocuments: ['Incident Report.pdf', 'Witness Statements.pdf', 'Investigation Summary.pdf'],
    additionalNotes: 'Multiple complaints filed. Investigation confirmed policy violations. Immediate action required.'
  },
  {
    id: 'PA005',
    employeeId: 'EMP089',
    employeeName: 'Emma Davis',
    employeeAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    actionType: 'review',
    reason: 'Quarterly performance check-in',
    initiatedBy: 'David Chen',
    initiatorRole: 'Engineering Manager',
    dateSubmitted: '2024-12-16',
    reportDate: '2024-12-14',
    priority: 'low',
    status: 'pending',
    supportingDocuments: ['Performance Review Q4.pdf'],
    additionalNotes: 'Regular quarterly review. Performance is meeting expectations.'
  }
];

// Mock data for decision history
const decisionHistory = [
  {
    id: 'PA_HIST_001',
    employeeName: 'John Smith',
    actionType: 'fire',
    decision: 'approved',
    decidedBy: 'Robert Wilson',
    decidedDate: '2024-12-15',
    reason: 'Repeated policy violations',
    notes: 'Severance package approved. Exit interview scheduled.'
  },
  {
    id: 'PA_HIST_002',
    employeeName: 'Maria Garcia',
    actionType: 'review',
    decision: 'approved',
    decidedBy: 'Susan Lee',
    decidedDate: '2024-12-14',
    reason: 'Promotion consideration',
    notes: 'Promoted to Senior Developer. Salary increase approved.'
  },
  {
    id: 'PA_HIST_003',
    employeeName: 'Kevin Brown',
    actionType: 'review',
    decision: 'rejected',
    decidedBy: 'Robert Wilson',
    decidedDate: '2024-12-12',
    reason: 'Performance improvement needed',
    notes: 'Rejected termination request. Extended improvement plan by 60 days.'
  },
  {
    id: 'PA_HIST_004',
    employeeName: 'Jennifer Lee',
    actionType: 'fire',
    decision: 'approved',
    decidedBy: 'Susan Lee',
    decidedDate: '2024-12-10',
    reason: 'Budget constraints',
    notes: 'Position eliminated due to restructuring. Offered internal transfer options.'
  }
];

interface PendingActionsProps {
  onNavigateToEmailTemplates?: () => void;
}

export function PendingActions({ onNavigateToEmailTemplates }: PendingActionsProps) {
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [initiatorFilter, setInitiatorFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [decisionDialog, setDecisionDialog] = useState<{open: boolean, action: any, decision: 'approve' | 'reject' | null}>({
    open: false,
    action: null,
    decision: null
  });
  const [decisionNotes, setDecisionNotes] = useState<string>('');

  // Filter and search functionality
  const filteredActions = useMemo(() => {
    return pendingActionsData.filter(action => {
      const matchesSearch = action.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          action.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          action.initiatedBy.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesActionType = actionFilter === 'all' || action.actionType === actionFilter;
      const matchesPriority = priorityFilter === 'all' || action.priority === priorityFilter;
      const matchesInitiator = initiatorFilter === 'all' || action.initiatedBy === initiatorFilter;

      return matchesSearch && matchesActionType && matchesPriority && matchesInitiator;
    });
  }, [searchQuery, actionFilter, priorityFilter, initiatorFilter]);

  const getActionBadge = (actionType: string) => {
    const variants = {
      fire: 'destructive' as const,
      review: 'default' as const
    };
    return <Badge variant={variants[actionType as keyof typeof variants]}>{actionType}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: 'destructive' as const,
      medium: 'default' as const,
      low: 'secondary' as const
    };
    return <Badge variant={variants[priority as keyof typeof variants]}>{priority}</Badge>;
  };

  const getDecisionBadge = (decision: string) => {
    const variants = {
      approved: 'default' as const,
      rejected: 'secondary' as const
    };
    const icons = {
      approved: <CheckCircle className="h-3 w-3 mr-1" />,
      rejected: <XCircle className="h-3 w-3 mr-1" />
    };
    return (
      <Badge variant={variants[decision as keyof typeof variants]} className="flex items-center">
        {icons[decision as keyof typeof icons]}
        {decision}
      </Badge>
    );
  };

  const handleDecision = (action: any, decision: 'approve' | 'reject') => {
    setDecisionDialog({ open: true, action, decision });
  };

  const confirmDecision = () => {
    if (decisionDialog.action && decisionDialog.decision) {
      console.log(`${decisionDialog.decision === 'approve' ? 'Approving' : 'Rejecting'} action:`, decisionDialog.action.id);
      console.log('Decision notes:', decisionNotes);
      
      // Here you would typically make an API call to save the decision
      // For now, we'll just close the dialog
      setDecisionDialog({ open: false, action: null, decision: null });
      setDecisionNotes('');
      
      // If approved, suggest navigating to email templates
      if (decisionDialog.decision === 'approve' && onNavigateToEmailTemplates) {
        setTimeout(() => {
          const shouldNavigate = window.confirm('Action approved successfully! Would you like to go to Email Templates to send the notification email?');
          if (shouldNavigate) {
            onNavigateToEmailTemplates();
          }
        }, 500);
      }
    }
  };

  const uniqueInitiators = [...new Set(pendingActionsData.map(action => action.initiatedBy))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl">Pending Actions</h1>
        <p className="text-muted-foreground">
          Review and approve employee action requests requiring management approval
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-semibold">{pendingActionsData.length}</p>
                <p className="text-sm text-muted-foreground">Total Pending</p>
              </div>
              <Clock className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-semibold">
                  {pendingActionsData.filter(a => a.priority === 'high').length}
                </p>
                <p className="text-sm text-muted-foreground">High Priority</p>
              </div>
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-semibold">
                  {pendingActionsData.filter(a => a.actionType === 'fire').length}
                </p>
                <p className="text-sm text-muted-foreground">Termination Requests</p>
              </div>
              <XCircle className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-semibold">
                  {pendingActionsData.filter(a => a.actionType === 'review').length}
                </p>
                <p className="text-sm text-muted-foreground">Review Requests</p>
              </div>
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending">Pending Actions</TabsTrigger>
          <TabsTrigger value="history">Decision History</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search employees, reasons, or initiators..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Action Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="fire">Termination</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={initiatorFilter} onValueChange={setInitiatorFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Initiator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Initiators</SelectItem>
                    {uniqueInitiators.map(initiator => (
                      <SelectItem key={initiator} value={initiator}>{initiator}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Pending Actions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Requests ({filteredActions.length})</CardTitle>
              <CardDescription>
                Actions requiring approval from management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Initiated By</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActions.map((action) => (
                    <TableRow key={action.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={action.employeeAvatar} alt={action.employeeName} />
                            <AvatarFallback>
                              {action.employeeName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{action.employeeName}</p>
                            <p className="text-xs text-muted-foreground">{action.employeeId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getActionBadge(action.actionType)}
                      </TableCell>
                      <TableCell className="max-w-[250px]">
                        <p className="truncate text-sm">{action.reason}</p>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{action.initiatedBy}</p>
                          <p className="text-xs text-muted-foreground">{action.initiatorRole}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getPriorityBadge(action.priority)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>Submitted: {new Date(action.dateSubmitted).toLocaleDateString()}</p>
                          <p className="text-xs text-muted-foreground">
                            Report: {new Date(action.reportDate).toLocaleDateString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleDecision(action, 'approve')}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDecision(action, 'reject')}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Action Request Details</DialogTitle>
                                <DialogDescription>
                                  Complete information for {action.employeeName}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium">Employee Information</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {action.employeeName} ({action.employeeId})
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Action Type</h4>
                                    {getActionBadge(action.actionType)}
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Initiated By</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {action.initiatedBy} - {action.initiatorRole}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Priority</h4>
                                    {getPriorityBadge(action.priority)}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium">Reason</h4>
                                  <p className="text-sm text-muted-foreground">{action.reason}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium">Additional Notes</h4>
                                  <p className="text-sm text-muted-foreground">{action.additionalNotes}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium">Supporting Documents</h4>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {action.supportingDocuments.map((doc, index) => (
                                      <Badge key={index} variant="outline">
                                        <FileText className="h-3 w-3 mr-1" />
                                        {doc}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Decision History</CardTitle>
              <CardDescription>
                Previous action decisions and their outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Action Type</TableHead>
                    <TableHead>Decision</TableHead>
                    <TableHead>Decided By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {decisionHistory.map((decision) => (
                    <TableRow key={decision.id}>
                      <TableCell className="font-medium">{decision.employeeName}</TableCell>
                      <TableCell>
                        {getActionBadge(decision.actionType)}
                      </TableCell>
                      <TableCell>
                        {getDecisionBadge(decision.decision)}
                      </TableCell>
                      <TableCell>{decision.decidedBy}</TableCell>
                      <TableCell>
                        {new Date(decision.decidedDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <p className="truncate text-sm">{decision.reason}</p>
                      </TableCell>
                      <TableCell className="max-w-[250px]">
                        <p className="truncate text-sm text-muted-foreground">{decision.notes}</p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Decision Confirmation Dialog */}
      <Dialog open={decisionDialog.open} onOpenChange={(open) => 
        setDecisionDialog(prev => ({...prev, open}))
      }>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {decisionDialog.decision === 'approve' ? 'Approve' : 'Reject'} Action Request
            </DialogTitle>
            <DialogDescription>
              You are about to {decisionDialog.decision} the action request for{' '}
              {decisionDialog.action?.employeeName}. Please provide additional notes if needed.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/50">
              <p className="text-sm font-medium">Action Details:</p>
              <p className="text-sm text-muted-foreground">
                {decisionDialog.action?.actionType === 'fire' ? 'Termination' : 'Review'} request for{' '}
                {decisionDialog.action?.employeeName}
              </p>
              <p className="text-sm text-muted-foreground">
                Reason: {decisionDialog.action?.reason}
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Decision Notes (Optional)</label>
              <Textarea
                placeholder="Add any additional notes or instructions for this decision..."
                value={decisionNotes}
                onChange={(e) => setDecisionNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDecisionDialog({open: false, action: null, decision: null})}
            >
              Cancel
            </Button>
            <Button
              variant={decisionDialog.decision === 'approve' ? 'default' : 'destructive'}
              onClick={confirmDecision}
            >
              {decisionDialog.decision === 'approve' ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Approve Request
                </>
              ) : (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Reject Request
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}