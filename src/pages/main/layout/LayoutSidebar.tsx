import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";
import {
  Home,
  Search,
  Bell,
  MessageCircle,
  Bookmark,
  Users,
  Calendar,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import LogoHeaderLight from "@/assets/ynov_logo.webp";
import LogoHeaderDark from "@/assets/ynov_logo_black.webp";
import { SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils";

// Navigation items for the social media app
const menuItems = [
  { icon: Home, label: "Home", path: "/feed" },
  { icon: Search, label: "Explore", path: "/explore" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: MessageCircle, label: "Messages", path: "/chat" },
  { icon: Bookmark, label: "Saved", path: "/saved" },
  { icon: Users, label: "Groups", path: "/groups" },
  { icon: Calendar, label: "Events", path: "/events" },
];

export function LayoutSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const { open } = useSidebar()
  const { theme } = useTheme();

  console.log(open)
  return (
    <Sidebar className="hidden md:flex bg-card" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className={cn("min-h-max w-full flex items-center justify-between hover:bg-transparent active:bg-transparent focus:bg-transparent", !open && "justify-center")}>
                <Link to="/feed" className={cn("flex items-center h-max w-max gap-2", !open && "hidden")}>
                  <img className="object-cover" width={80} height={80} src={theme === "light" ? LogoHeaderDark : LogoHeaderLight} alt="YNetwork Logo" />
                </Link>
                <SidebarTrigger className="size-5" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={isActive} className="w-full">
                      <Link to={item.path} className={cn("flex items-center justify-between", !open && "justify-center")}>
                        <div className="flex items-center gap-3">
                          <item.icon className="size-5" />
                          <span className={cn(!open && "hidden")}>{item.label}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
