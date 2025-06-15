import { createServiceClient } from "@/lib/axios";
import type { UserProfile } from "../users/api";

const notificationsClient = createServiceClient("notifications");

export interface Notification {
  _id: string;
  recipient_id: string;
  actor_id: UserProfile;
  type: string;
  content?: string;
  target_entity_id?: string;
  target_entity_type?: 'Post' | 'Comment' | 'User' | 'Like' | string;
  target_entity_ref?: string;
  is_read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetNotificationsParams {
  page?: number;
  limit?: number;
  filter?: 'all' | 'unread';
}

export interface NotificationsResponse {
  message: string;
  notifications: Notification[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

export const getNotifications = (params: GetNotificationsParams) => {
  return notificationsClient.get<NotificationsResponse>("/", { params });
};

export const markAsRead = (notificationId: string) => {
  return notificationsClient.put<{ message: string, notification: Notification }>(`/${notificationId}/read`);
};

export const markAllAsRead = () => {
  return notificationsClient.post<{ message: string }>("/read-all");
};

export const deleteNotification = (notificationId: string) => {
  return notificationsClient.delete(`/${notificationId}`);
}; 