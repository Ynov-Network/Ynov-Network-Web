import { createServiceClient } from "@/lib/axios";
import type { Post } from "../posts/api";

const usersClient = createServiceClient("users");

export interface UserProfile {
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  university_email?: string;
  profile_picture_url?: string;
  bio?: string;
  phone_number?: string;
  country?: string;
  city?: string;
  follower_count: number;
  following_count: number;
  post_count: number;
  date_joined: string;
  account_privacy: 'public' | 'private' | 'followers_only';
  is_following: boolean;
  two_factor_enabled: boolean;
  show_online_status: boolean;
  allow_message_requests: 'everyone' | 'following' | 'none';
  notification_settings: {
    likes: boolean;
    comments: boolean;
    follows: boolean;
    messages: boolean;
    posts: boolean;
  };
}

export interface UpdateUserRequest {
  first_name?: string;
  last_name?: string;
  username?: string;
  bio?: string | null;
  phone_number?: string | null;
  country?: string | null;
  city?: string | null;
}

export interface UpdateProfilePictureRequest {
  image: string;
}

export interface UpdatePrivacySettingsRequest {
  account_privacy?: 'public' | 'private' | 'followers_only';
  show_online_status?: boolean;
  allow_message_requests?: 'everyone' | 'following' | 'none';
}

export interface UpdateNotificationSettingsRequest {
  likes?: boolean;
  comments?: boolean;
  follows?: boolean;
  messages?: boolean;
  posts?: boolean;
}

export interface DeleteUserRequest {
  password: string;
}

export const getMyProfile = () => {
  return usersClient.get<UserProfile>("/me");
};

export const getUserProfile = (userId: string) => {
  return usersClient.get<UserProfile>(`/${userId}`);
};

export const getLikedPosts = (userId: string) => {
  return usersClient.get<Post[]>(`/${userId}/liked`);
}

export const getSuggestedUsers = () => {
  return usersClient.get<UserProfile[]>("/suggestions");
};

export const updateUserProfile = (data: UpdateUserRequest) => {
  return usersClient.put<{ user: UserProfile }>("/me", data);
};

export const updateProfilePicture = (formData: FormData) => {
  return usersClient.post<{ message: string, user: UserProfile }>("/me/profile-picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updatePrivacySettings = (data: UpdatePrivacySettingsRequest) => {
  return usersClient.put<{ user: UserProfile }>("/me/privacy", data);
};

export const updateNotificationSettings = (data: UpdateNotificationSettingsRequest) => {
  return usersClient.put<{ user: UserProfile }>("/me/notification-settings", data);
};

export const deleteUser = (data: DeleteUserRequest) => {
  return usersClient.delete<{ message: string }>("/me", { data });
}; 