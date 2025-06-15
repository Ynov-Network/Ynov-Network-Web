import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bell,
  Check,
  Trash2,
  CheckCheck,
  MessageCircle,
  Heart,
  UserPlus,
  Users,
  CalendarPlus,
} from "lucide-react";
import { useGetNotifications } from "@/services/notifications/queries";
import {
  useMarkAllAsRead,
  useMarkAsRead,
  useDeleteNotification,
} from "@/services/notifications/mutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { Notification } from "@/services/notifications/api";
import { Link } from "react-router";

const Notifications = () => {
  const queryClient = useQueryClient();
  const { data: notificationsData, isLoading } =
    useGetNotifications({ filter: "all" });
  const notifications = notificationsData?.data.notifications ?? [];

  const markAsReadMutation = useMarkAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();
  const deleteNotificationMutation = useDeleteNotification();

  const handleMarkAsRead = (id: string) => {
    markAsReadMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Notification marked as read.");
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      },
      onError: () => toast.error("Failed to mark as read."),
    });
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("All notifications marked as read.");
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      },
      onError: () => toast.error("Failed to mark all as read."),
    });
  };

  const handleDeleteNotification = (id: string) => {
    deleteNotificationMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Notification deleted.");
      },
      onError: (error) => {
        toast.error(`Failed to delete notification: ${error.message}`);
      },
    });
  };

  const renderNotificationIcon = (type: string) => {
    const iconProps = {
      className: "h-5 w-5 text-primary-foreground",
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
    const actorName = `${notification.actor_id.first_name} ${notification.actor_id.last_name}`;
    switch (notification.type) {
      case 'new_message':
        return (
          <p>
            <span className="font-semibold">{actorName}</span> sent you a message.
          </p>
        );
      case 'follow':
        return (
          <p>
            <span className="font-semibold">{actorName}</span> started following you.
          </p>
        );
      case 'like':
        return (
          <p>
            <span className="font-semibold">{actorName}</span> liked your post.
            {notification.target_entity_ref && (
              <span className="text-muted-foreground ml-1 italic">
                "{truncate(notification.target_entity_ref, 40)}"
              </span>
            )}
          </p>
        );
      case 'comment':
        return (
          <div>
            <p>
              <span className="font-semibold">{actorName}</span> commented on your post.
            </p>
            <p className="mt-1 p-2 bg-accent rounded-md text-sm italic">
              "{notification.content}"
            </p>
          </div>
        );
      case 'new_event':
        return (
          <p>
            <span className="font-semibold">{actorName}</span> created a new
            event:{" "}
            <span className="italic">
              "{truncate(notification.content ?? "", 40)}"
            </span>
          </p>
        );
      case 'new_group':
        return (
          <p>
            <span className="font-semibold">{actorName}</span> created a new
            group:{" "}
            <span className="italic">
              "{truncate(notification.content ?? "", 40)}"
            </span>
          </p>
        );
      case 'group_join':
        return (
          <p>
            <span className="font-semibold">{actorName}</span> joined the group:{" "}
            <span className="italic">
              "{truncate(notification.content ?? "", 40)}"
            </span>
          </p>
        );
      default:
        return (
          <p>
            <span className="font-semibold">{actorName}</span> {notification.content}
          </p>
        );
    }
  }

  const renderNotificationList = (list: Notification[]) => {
    if (list.length === 0) {
      return (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No notifications yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            We'll let you know when something new happens.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {list.map((notification) => {
          const notificationContent = (
            <div
              className={cn(
                "flex items-start gap-4 p-4 rounded-lg transition-colors",
                notification.is_read
                  ? "bg-transparent"
                  : "bg-primary/5 hover:bg-primary/10"
              )}
            >
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary to-brand-secondary`}
              >
                {renderNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                {renderNotificationContent(notification)}
                <p className="text-sm text-muted-foreground mt-1">
                  {formatRelativeTime(notification.createdAt)}
                </p>
              </div>
              <div className="flex gap-2">
                {!notification.is_read && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleMarkAsRead(notification._id);
                    }}
                    disabled={markAsReadMutation.isPending}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleDeleteNotification(notification._id)
                  }}
                  disabled={deleteNotificationMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );

          if (notification.type === 'new_message' && notification.target_entity_id) {
            return (
              <Link to={`/chat?conversationId=${notification.target_entity_id}`} key={notification._id}>
                {notificationContent}
              </Link>
            )
          }

          if ((notification.type === 'like' || notification.type === 'comment') && notification.target_entity_id) {
            return (
              <Link to={`/post/${notification.target_entity_id}`} key={notification._id}>
                {notificationContent}
              </Link>
            )
          }

          if (notification.type === 'follow') {
            return (
              <Link to={`/profile/${notification.actor_id.username}`} key={notification._id}>
                {notificationContent}
              </Link>
            )
          }

          if (notification.type === 'new_event') {
            return (
              <Link to={`/events`} key={notification._id}>
                {notificationContent}
              </Link>
            )
          }

          if (notification.type === 'new_group' || notification.type === 'group_join') {
            return (
              <Link to={`/groups`} key={notification._id}>
                {notificationContent}
              </Link>
            )
          }

          return (
            <div key={notification._id}>
              {notificationContent}
            </div>
          )
        })}
      </div>
    );
  };

  const truncate = (str: string, n: number) => {
    return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
  };

  return (
    <div className="min-h-screen">
      <header className="bg-background border-b border-border px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Notifications</h1>
            <p className="text-muted-foreground">
              Stay up to date with your account activity.
            </p>
          </div>
          <Button
            onClick={handleMarkAllAsRead}
            disabled={
              markAllAsReadMutation.isPending ||
              notifications.every((n) => n.is_read)
            }
          >
            <CheckCheck className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        </div>
      </header>
      <main className="p-6">
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              renderNotificationList(notifications)
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Notifications;