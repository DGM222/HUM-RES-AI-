import { useState } from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from './ui/sidebar';
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
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { ArrowLeft, FileText } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

import { View } from '../types/view'; // 👈 import shared type

export function DashboardLayout() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'employee-profile':
        return <EmployeeProfile />;
      case 'performance-report':
        return <PerformanceReport />;
      case 'pending-actions':
        return (
          <PendingActions
            onNavigateToEmailTemplates={() => setCurrentView('email-templates')}
          />
        );
      case 'email-templates':
        return <EmailTemplates />;
      case 'employee-chatbot':
        return <EmployeeChatbot />;
      case 'hr-inbox':
        return (
          <HRInbox
            onNavigateToProfile={() => setCurrentView('employee-profile')}
            onNavigateToPendingActions={() => setCurrentView('pending-actions')}
          />
        );
      case 'hr-calendar':
        return <HRCalendar onNavigateToProfile={() => setCurrentView('employee-profile')} />;
      case 'hr-settings':
        return <HRSettings onNavigateToProfile={() => setCurrentView('employee-profile')} />;
      case 'employee-directory':
        return (
          <EmployeeDirectory
            onNavigateToProfile={() => setCurrentView('employee-profile')}
            onNavigateToReport={() => setCurrentView('performance-report')}
          />
        );
      case 'performance-reports-list':
        return (
          <PerformanceReportsList
            onNavigateToReport={() => setCurrentView('performance-report')}
          />
        );
      case 'data-analytics':
        return <DataAnalytics />;
      default:
        return (
          <Dashboard
            onNavigateToProfile={() => setCurrentView('employee-profile')}
            onNavigateToReport={() => setCurrentView('performance-report')}
            onNavigateToPendingActions={() => setCurrentView('pending-actions')}
            onNavigateToChatbot={() => setCurrentView('employee-chatbot')}
            onNavigateToCalendar={() => setCurrentView('hr-calendar')}
            onNavigateToSettings={() => setCurrentView('hr-settings')}
            onNavigateToDirectory={() => setCurrentView('employee-directory')}
          />
        );
    }
  };

  const getBreadcrumb = () => {
    const breadcrumbMap: Record<View, string> = {
      'dashboard': 'Overview',
      'employee-profile': 'Employee Profile',
      'performance-report': 'Performance Report',
      'pending-actions': 'Pending Actions',
      'email-templates': 'Email Templates',
      'employee-chatbot': 'HR Assistant',
      'hr-inbox': 'HR Inbox',
      'hr-calendar': 'HR Calendar',
      'hr-settings': 'HR Settings',
      'employee-directory': 'Employee Directory',
      'performance-reports-list': 'Performance Reports',
      'data-analytics': 'Data Analytics',
    };

    return (
      <Breadcrumb>
        <BreadcrumbList>
          {currentView !== 'dashboard' && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" onClick={() => setCurrentView('dashboard')}>
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>{breadcrumbMap[currentView]}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

  return (
    <SidebarProvider>
      <AppSidebar onNavigate={setCurrentView} /> {/* ✅ FIXED */}
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
                <Button variant="outline" size="sm" onClick={() => setCurrentView('employee-profile')}>
                  View Sample Profile
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentView('performance-report')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Sample Report
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
