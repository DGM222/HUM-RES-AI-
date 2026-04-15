import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Users,
  FileText,
  BarChart3,
  Clock,
  UserCheck,
  AlertTriangle,
  Building2,
  Mail,
  MessageCircle
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "./sidebar";

// Menu items
const items = [
  {
    title: "Home",
    icon: Home,
    action: null
  },
  {
    title: "HR Assistant",
    icon: MessageCircle,
    action: "employee-chatbot"
  },
  {
    title: "Search",
    icon: Search,
    action: null
  },
  {
    title: "Inbox",
    icon: Inbox,
    action: "hr-inbox"
  },
  {
    title: "Employee Directory",
    icon: Users,
    action: "employee-directory"
  },
  {
    title: "Calendar",
    icon: Calendar,
    action: "hr-calendar"
  },
  {
    title: "Settings",
    icon: Settings,
    action: "hr-settings"
  },
];

const hrItems = [
  {
    title: "Employee Directory",
    icon: Users,
    action: null
  },
  {
    title: "Performance Reports",
    icon: FileText,
    action: "performance-reports-list"
  },
  {
    title: "Analytics",
    icon: BarChart3,
    action: "data-analytics"
  },
  {
    title: "Time & Attendance",
    icon: Clock,
    action: null
  },
  {
    title: "Approvals",
    icon: UserCheck,
    action: "pending-actions"
  },
  {
    title: "Email Templates",
    icon: Mail,
    action: "email-templates"
  },
  {
    title: "Incidents",
    icon: AlertTriangle,
    action: null
  },
];

interface AppSidebarProps {
  onNavigate?: (view: string) => void;
}

export function AppSidebar({ onNavigate }: AppSidebarProps) {
  const handleItemClick = (action: string) => {
    if (onNavigate) {
      onNavigate(action);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Building2 className="h-6 w-6" />
          <span className="font-semibold">HR Management</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => {
                      if (item.action) {
                        handleItemClick(item.action);
                      }
                    }}
                    className={item.action ? "cursor-pointer" : undefined}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>HR Functions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {hrItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => {
                      if (item.action) {
                        handleItemClick(item.action);
                      }
                    }}
                    className={item.action ? "cursor-pointer" : undefined}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="px-4 py-2 text-xs text-muted-foreground">
          HR Management v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}