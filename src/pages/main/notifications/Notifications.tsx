import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
  Calendar,
  Trophy,
  Settings,
  Check,
  X,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "like",
      title: "Sarah Chen liked your post",
      message: "Your post about the AI workshop received a like",
      timestamp: "2 minutes ago",
      read: false,
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
      actionable: false
    },
    {
      id: "2",
      type: "comment",
      title: "Alex Rodriguez commented on your post",
      message: "Great insights! I'd love to collaborate on this project.",
      timestamp: "15 minutes ago",
      read: false,
      avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=150&h=150&fit=crop&crop=face",
      actionable: false
    },
    {
      id: "3",
      type: "follow",
      title: "Maria Gonzalez started following you",
      message: "You have a new follower",
      timestamp: "1 hour ago",
      read: false,
      avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=150&h=150&fit=crop&crop=face",
      actionable: true
    },
    {
      id: "4",
      type: "event",
      title: "Reminder: AI Workshop tomorrow",
      message: "Don't forget about the AI & Machine Learning Workshop starting at 2 PM",
      timestamp: "3 hours ago",
      read: true,
      avatar: null,
      actionable: false
    },
    {
      id: "5",
      type: "achievement",
      title: "You earned a new badge!",
      message: "Congratulations! You've received the 'Active Contributor' badge",
      timestamp: "1 day ago",
      read: true,
      avatar: null,
      actionable: false
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />;
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case "follow":
        return <UserPlus className="h-4 w-4 text-green-500" />;
      case "event":
        return <Calendar className="h-4 w-4 text-purple-500" />;
      case "achievement":
        return <Trophy className="h-4 w-4 text-yellow-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="h-6 w-6 text-ynov-primary" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Notifications</h1>
              <p className="text-gray-600">Stay updated with your activity</p>
            </div>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead} className="hover-scale">
                <Check className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>
            )}
            <Button variant="outline" className="hover-scale">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all" className="data-[state=active]:bg-ynov-primary data-[state=active]:text-white">
              All ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread" className="data-[state=active]:bg-ynov-primary data-[state=active]:text-white">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="mentions" className="data-[state=active]:bg-ynov-primary data-[state=active]:text-white">
              Mentions
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-ynov-primary data-[state=active]:text-white">
              Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {notifications.length === 0 ? (
              <Card className="p-8 text-center">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
                <p className="text-gray-500">When you get notifications, they'll show up here.</p>
              </Card>
            ) : (
              notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`transition-all duration-300 hover:shadow-md hover-scale cursor-pointer ${!notification.read ? 'bg-blue-50 border-l-4 border-l-ynov-primary' : ''
                    }`}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="relative flex-shrink-0">
                        {notification.avatar ? (
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={notification.avatar} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="h-12 w-12 bg-gradient-ynov rounded-full flex items-center justify-center">
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {notification.timestamp}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <div className="w-2 h-2 bg-ynov-primary rounded-full"></div>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {!notification.read && (
                                  <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                    <Check className="h-4 w-4 mr-2" />
                                    Mark as read
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                  onClick={() => deleteNotification(notification.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {notification.actionable && notification.type === "follow" && (
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" className="bg-ynov-primary hover:bg-ynov-primary/90 text-white">
                              Follow Back
                            </Button>
                            <Button size="sm" variant="outline">
                              View Profile
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {notifications.filter(n => !n.read).map((notification) => (
              <Card
                key={notification.id}
                className="bg-blue-50 border-l-4 border-l-ynov-primary transition-all duration-300 hover:shadow-md hover-scale cursor-pointer"
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      {notification.avatar ? (
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={notification.avatar} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-12 w-12 bg-gradient-ynov rounded-full flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{notification.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
                    </div>
                    <div className="w-2 h-2 bg-ynov-primary rounded-full mt-2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {notifications.filter(n => !n.read).length === 0 && (
              <Card className="p-8 text-center">
                <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                <p className="text-gray-500">You have no unread notifications.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="mentions" className="space-y-4">
            <Card className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No mentions yet</h3>
              <p className="text-gray-500">When someone mentions you, you'll see it here.</p>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            {notifications.filter(n => n.type === "event").map((notification) => (
              <Card key={notification.id} className="transition-all duration-300 hover:shadow-md hover-scale">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{notification.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Notifications;