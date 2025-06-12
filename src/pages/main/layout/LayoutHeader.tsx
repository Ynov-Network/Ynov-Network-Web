import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Bell,
  Settings,
  LogOut,
  Moon,
  Sun,
  User,
  Clock
} from "lucide-react";
import { Link } from "react-router";
import { useTheme } from "@/components/theme-provider";
// import { useAuth } from "@/contexts/AuthContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export const LayoutHeader = () => {
  // const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { isMobile } = useSidebar();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: "like",
      message: "Sarah Chen and 12 others liked your post",
      timestamp: "2 minutes ago",
      read: false,
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
      count: 13
    },
    {
      id: 2,
      type: "comment",
      message: "Alex Rodriguez commented: 'Great insights! Let's collaborate'",
      timestamp: "15 minutes ago",
      read: false,
      avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      type: "follow",
      message: "Maria Gonzalez and 3 others started following you",
      timestamp: "1 hour ago",
      read: false,
      avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=150&h=150&fit=crop&crop=face",
      count: 4
    }
  ];

  const user = {
    id: '1',
    username: 'student.ynov',
    email: "example@gmail.com",
    fullName: 'Student Ynov',
    avatar: `https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face`,
    bio: 'Computer Science student at Ynov Campus Maroc',
    followersCount: 142,
    followingCount: 89
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-card backdrop-blur-xl border-b border-border px-6 py-4 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between w-full">
        {/* Enhanced Search Bar - now takes full left space */}
        <div className={cn("flex-1 max-w-2xl", isMobile && "flex items-center gap-4")}>
          <div className={cn(!isMobile && "sr-only")}>
            <SidebarTrigger className="size-5" />
          </div>
          <div className="relative group w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted h-5 w-5 group-hover:text-primary transition-colors duration-300" />
            <Input
              placeholder="Search for friends, posts, topics..."
              className="pl-12 h-12 transition-all duration-300 w-full rounded-xl shadow-sm hover:shadow-md focus:shadow-lg"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Badge variant="outline" className="text-xs">⌘K</Badge>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4 ml-8">
          {/* Notifications with toned down hover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative hover:bg-muted transition-colors duration-200">
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0 shadow-xl border-0 rounded-xl" align="end">
              <div className="p-4 border-b bg-gradient-to-r from-primary to-brand-secondary">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">Notifications</h3>
                  <Badge className="bg-white/20 text-white">
                    {unreadNotifications} new
                  </Badge>
                </div>
              </div>
              <div className="max-h-96 overflow-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`p-4 border-b hover:bg-accent transition-colors duration-200 ${!notification.read ? 'bg-card' : ''}`}>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={notification.avatar} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        {notification.count && notification.count > 1 && (
                          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-xs p-0 flex items-center justify-center">
                            +{notification.count}
                          </Badge>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{notification.message}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {notification.timestamp}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t bg-card">
                <Link to="/notifications">
                  <Button variant="ghost" className="w-full text-center hover:bg-background transition-colors">
                    View all notifications
                  </Button>
                </Link>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Menu with toned down hover */}
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="h-9 w-9 hover:ring-2 hover:ring-primary/20 transition-all duration-200 cursor-pointer">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gradient-brand text-white font-semibold">
                  {user?.fullName?.[0]}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0 shadow-xl border-0 rounded-xl" align="end">
              <div className="p-4 border-b bg-gradient-to-r from-primary to-brand-secondary">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 ring-2 ring-white/20">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-white/20 text-white">{user?.fullName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-white">{user?.fullName}</p>
                    <p className="text-sm text-white/80">@{user?.username}</p>
                  </div>
                </div>
              </div>
              <div className="py-2">
                <Link to={`/profile/${user?.username}`}>
                  <Button variant="ghost" className="w-full justify-start px-4 hover:bg-accent transition-colors">
                    <User className="h-4 w-4 mr-3" />
                    View Profile
                  </Button>
                </Link>
                <Link to="/settings">
                  <Button variant="ghost" className="w-full justify-start px-4 hover:bg-accent transition-colors">
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 hover:bg-accent transition-colors"
                  onClick={() => toggleTheme()}
                >
                  {theme === "light" ? <Sun className="h-4 w-4 mr-3" /> : <Moon className="h-4 w-4 mr-3" />}
                  {theme === "light" ? 'Light Mode' : 'Dark Mode'}
                </Button>
                <div className="border-t my-2"></div>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                // onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};