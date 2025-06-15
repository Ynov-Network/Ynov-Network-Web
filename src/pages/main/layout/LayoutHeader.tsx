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
  Clock,
  MessageCircle,
  Heart,
  UserPlus,
  Users,
  CalendarPlus,
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
import { cn, formatRelativeTime } from "@/lib/utils";
import { useGetMyProfile } from "@/services/users/queries";
import { useGetNotifications } from "@/services/notifications/queries";
import type { Notification } from "@/services/notifications/api";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { toast } from "sonner";

export const LayoutHeader = () => {
  // const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { isMobile } = useSidebar();
  const queryClient = useQueryClient();

  const { data: profileData } = useGetMyProfile();
  const user = profileData?.data;

  const { data: notificationsData } = useGetNotifications({ limit: 10 });
  const notifications = notificationsData?.data.notifications ?? [];
  const unreadNotificationsCount =
    notifications.filter((n) => !n.is_read).length ?? 0;

  useEffect(() => {
    if (!user?._id) return;

    if ((socket.auth as { userId: string })?.userId !== user._id) {
      socket.auth = { userId: user._id };
      socket.disconnect().connect();
    }

    const handleNewNotification = (notification: Notification) => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      const actorName = `${notification.actor_id.first_name} ${notification.actor_id.last_name}`;
      toast.info(`${actorName} ${notification.content}`);
    };

    socket.on("newNotification", handleNewNotification);

    return () => {
      socket.off("newNotification", handleNewNotification);
    };
  }, [user, queryClient]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const renderNotificationIcon = (type: string) => {
    const iconProps = {
      className: "h-5 w-5 text-white flex-shrink-0",
    };
    switch (type) {
      case "new_message":
        return <MessageCircle {...iconProps} />;
      case "follow":
        return <UserPlus {...iconProps} />;
      case "like":
        return <Heart {...iconProps} />;
      case "new_event":
        return <CalendarPlus {...iconProps} />;
      case "new_group":
      case "group_join":
        return <Users {...iconProps} />;
      default:
        return <Bell {...iconProps} />;
    }
  };

  const renderNotificationContent = (notification: Notification) => {
    const actorName = (
      <span className="font-semibold">
        {notification.actor_id.first_name} {notification.actor_id.last_name}
      </span>
    );
    switch (notification.type) {
      case "new_message":
        return <p>{actorName} sent you a message.</p>;
      case "follow":
        return <p>{actorName} started following you.</p>;
      case "like":
        return (
          <p>
            {actorName} liked your post.
            {notification.target_entity_ref && (
              <span className="text-muted-foreground ml-1 italic">
                "{truncate(notification.target_entity_ref, 20)}"
              </span>
            )}
          </p>
        );
      case "comment":
        return (
          <div>
            <p>
              {actorName} commented on your post.
            </p>
            <p className="mt-1 p-2 bg-accent rounded-md text-sm italic">
              "{truncate(notification.content ?? "", 30)}"
            </p>
          </div>
        );
      case "new_event":
        return (
          <p>
            {actorName} created a new event:{" "}
            <span className="italic">
              "{truncate(notification.content ?? "", 20)}"
            </span>
          </p>
        );
      case "new_group":
        return (
          <p>
            {actorName} created a new group:{" "}
            <span className="italic">
              "{truncate(notification.content ?? "", 20)}"
            </span>
          </p>
        );
      case "group_join":
        return (
          <p>
            {actorName} joined the group:{" "}
            <span className="italic">
              "{truncate(notification.content ?? "", 20)}"
            </span>
          </p>
        );
      default:
        return (
          <p>
            {actorName} {notification.content}
          </p>
        );
    }
  };

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
                {unreadNotificationsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center">
                    {unreadNotificationsCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0 shadow-xl border-0 rounded-xl" align="end">
              <div className="p-4 border-b bg-gradient-to-r from-primary to-brand-secondary">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">Notifications</h3>
                  {unreadNotificationsCount > 0 && (
                    <Badge className="bg-white/20 text-white">
                      {unreadNotificationsCount} new
                    </Badge>
                  )}
                </div>
              </div>
              <div className="max-h-96 overflow-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => {
                    const content = (
                      <div
                        className={`p-4 border-b hover:bg-accent transition-colors duration-200 ${!notification.is_read ? "bg-card" : ""}`}
                      >
                        <div className="flex items-start space-x-4">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-brand-secondary`}
                          >
                            {renderNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm">
                              {renderNotificationContent(notification)}
                            </div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3" />
                              {formatRelativeTime(notification.createdAt)}
                            </p>
                          </div>
                          {!notification.is_read && (
                            <div className="w-2.5 h-2.5 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                          )}
                        </div>
                      </div>
                    );

                    if (notification.type === 'new_message' && notification.target_entity_id) {
                      return (
                        <Link to={`/chat?conversationId=${notification.target_entity_id}`} key={notification._id}>
                          {content}
                        </Link>
                      )
                    }

                    if ((notification.type === 'like' || notification.type === 'comment') && notification.target_entity_id) {
                      return (
                        <Link to={`/post/${notification.target_entity_id}`} key={notification._id}>
                          {content}
                        </Link>
                      )
                    }

                    if (notification.type === 'follow') {
                      return (
                        <Link to={`/profile/${notification.actor_id.username}`} key={notification._id}>
                          {content}
                        </Link>
                      )
                    }

                    if (notification.type === 'new_event') {
                      return (
                        <Link to={`/events`} key={notification._id}>
                          {content}
                        </Link>
                      )
                    }

                    if (notification.type === 'new_group' || notification.type === 'group_join') {
                      return (
                        <Link to={`/groups`} key={notification._id}>
                          {content}
                        </Link>
                      )
                    }

                    return <div key={notification._id}>{content}</div>
                  })
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <Bell className="h-10 w-10 mx-auto" />
                    <p className="mt-4">No new notifications</p>
                  </div>
                )}
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
                <AvatarImage src={user?.profile_picture_url} />
                <AvatarFallback className="bg-gradient-brand text-white font-semibold">
                  {user?.first_name?.[0]}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0 shadow-xl border-0 rounded-xl" align="end">
              <div className="p-4 border-b bg-gradient-to-r from-primary to-brand-secondary">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 ring-2 ring-white/20">
                    <AvatarImage src={user?.profile_picture_url} />
                    <AvatarFallback className="bg-white/20 text-white">
                      {user?.first_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-white">
                      {user?.first_name} {user?.last_name}
                    </p>
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
                  {theme === "light" ? (
                    <Sun className="h-4 w-4 mr-3" />
                  ) : (
                    <Moon className="h-4 w-4 mr-3" />
                  )}
                  {theme === "light" ? "Light Mode" : "Dark Mode"}
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

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}