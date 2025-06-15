import { createServiceClient } from "@/lib/axios";

const usersClient = createServiceClient("users");

export interface UserProfile {
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  university_email?: string;
  profile_picture_url?: string;
  bio?: string;
  country?: string;
  city?: string;
  follower_count: number;
  following_count: number;
  post_count: number;
  date_joined: string;
  account_privacy: 'public' | 'private' | 'followers_only';
  is_following: boolean;
}

export interface UpdateUserRequest {
  first_name?: string;
  last_name?: string;
  username?: string;
  bio?: string | null;
  country?: string | null;
  city?: string | null;
}

export interface UpdateProfilePictureRequest {
  image: string;
}

export interface UpdatePrivacySettingsRequest {
  account_privacy?: 'public' | 'private' | 'followers_only';
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

export const getSuggestedUsers = () => {
  return usersClient.get<UserProfile[]>("/suggestions");
};

export const updateUserProfile = (data: UpdateUserRequest) => {
  return usersClient.put<{ user: UserProfile }>("/me", data);
};

export const updateProfilePicture = (data: UpdateProfilePictureRequest) => {
  return usersClient.post<{ message: string, user: UserProfile }>("/me/profile-picture", data);
};

export const updatePrivacySettings = (data: UpdatePrivacySettingsRequest) => {
  return usersClient.put<{ user: UserProfile }>("/me/privacy", data);
};

export const deleteUser = (data: DeleteUserRequest) => {
  return usersClient.delete<{ message: string }>("/me", { data });
}; 