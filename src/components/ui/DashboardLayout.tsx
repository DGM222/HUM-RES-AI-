import { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from './sidebar';
import { AppSidebar } from './AppSidebar';
import { Dashboard } from './Dashboard';
import { EmployeeProfile } from './EmployeeProfile';
import { PerformanceReport } from './PerformanceReport';
import { PendingActions } from './PendingActions';
import { EmailTemplates } from './EmailTemplates';
import { EmployeeChatbot } from './EmployeeChatbot';
import { HRInbox } from './HRInbox';
import { HRCalendar } from './HRCalendar';
import { HRSettings } from './HRSettings';
import { EmployeeDirectory } from './EmployeeDirectory';
import { PerformanceReportsList } from './PerformanceReportsList';
import { DataAnalytics } from './DataAnalytics';
import { Separator } from './separator';
import { Button } from './button';
import { ArrowLeft, FileText } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './breadcrumb';

export function DashboardLayout() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'employee-profile' | 'performance-report' | 'pending-actions' | 'email-templates' | 'employee-chatbot' | 'hr-inbox' | 'hr-calendar' | 'hr-settings' | 'employee-directory' | 'performance-reports-list' | 'data-analytics'>('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'employee-profile':
        return <EmployeeProfile />;
      case 'performance-report':
        return <PerformanceReport />;
      case 'pending-actions':
        return <PendingActions onNavigateToEmailTemplates={() => setCurrentView('email-templates')} />;
      case 'email-templates':
        return <EmailTemplates />;
      case 'employee-chatbot':
        return <EmployeeChatbot />;
      case 'hr-inbox':
        return <HRInbox 
          onNavigateToProfile={() => setCurrentView('employee-profile')}
          onNavigateToPendingActions={() => setCurrentView('pending-actions')}
        />;
      case 'hr-calendar':
        return <HRCalendar 
          onNavigateToProfile={() => setCurrentView('employee-profile')}
        />;
      case 'hr-settings':
        return <HRSettings 
          onNavigateToProfile={() => setCurrentView('employee-profile')}
        />;
      case 'employee-directory':
        return <EmployeeDirectory 
          onNavigateToProfile={() => setCurrentView('employee-profile')}
          onNavigateToReport={() => setCurrentView('performance-report')}
        />;
      case 'performance-reports-list':
        return <PerformanceReportsList 
          onNavigateToReport={() => setCurrentView('performance-report')}
        />;
      case 'data-analytics':
        return <DataAnalytics />;
      default:
        return <Dashboard 
          onNavigateToProfile={() => setCurrentView('employee-profile')}
          onNavigateToReport={() => setCurrentView('performance-report')}
          onNavigateToPendingActions={() => setCurrentView('pending-actions')}
          onNavigateToChatbot={() => setCurrentView('employee-chatbot')}
          onNavigateToCalendar={() => setCurrentView('hr-calendar')}
          onNavigateToSettings={() => setCurrentView('hr-settings')}
          onNavigateToDirectory={() => setCurrentView('employee-directory')}
        />;
    }
  };

  const getBreadcrumb = () => {
    switch (currentView) {
      case 'employee-profile':
        return (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={() => setCurrentView('dashboard')}>
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Employee Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        );
      case 'performance-report':
        return (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={() => setCurrentView('dashboard')}>
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Performance Report</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        );
      case 'pending-actions':
        return (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={() => setCurrentView('dashboard')}>
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Pending Actions</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        );
      case 'email-templates':
        return (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={() => setCurrentView('dashboard')}>
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Email Templates</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        );
      case 'employee-chatbot':
        return (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={() => setCurrentView('dashboard')}>
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>HR Assistant</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        );
      case 'hr-inbox':
        return (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={() => setCurrentView('dashboard')}>
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>HR Inbox</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        );
      case 'hr-calendar':
        return (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={() => setCurrentView('dashboard')}>
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>HR Calendar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        );
      case 'hr-settings':
        return (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={() => setCurrentView('dashboard')}>
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>HR Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        );
      case 'employee-directory':
        return (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={() => setCurrentView('dashboard')}>
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Employee Directory</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        );
      case 'performance-reports-list':
        return (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={() => setCurrentView('dashboard')}>
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Performance Reports</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        );
      case 'data-analytics':
        return (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={() => setCurrentView('dashboard')}>
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Analytics</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        );
      default:
        return (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        );
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar onNavigate={setCurrentView} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {currentView !== 'dashboard' && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('dashboard')}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <Separator orientation="vertical" className="mr-2 h-4" />
            </>
          )}
          {getBreadcrumb()}
          <div className="ml-auto flex gap-2">
            {currentView === 'dashboard' && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentView('employee-profile')}
                >
                  View Sample Profile
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentView('performance-report')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Sample Report
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentView('pending-actions')}
                >
                  Pending Actions
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentView('email-templates')}
                >
                  Email Templates
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentView('employee-chatbot')}
                >
                  HR Assistant
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentView('hr-inbox')}
                >
                  HR Inbox
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentView('hr-calendar')}
                >
                  HR Calendar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentView('hr-settings')}
                >
                  HR Settings
                </Button>
              </>
            )}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {renderContent()}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}