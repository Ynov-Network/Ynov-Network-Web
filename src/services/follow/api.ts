import { createServiceClient } from "@/lib/axios";
import type { UserProfile } from "../users/api";

const usersClient = createServiceClient("users");

export interface FollowRequest {
  // From backend: follower_id, following_id, status, _id, created_at, updated_at
  _id: string;
  follower_id: UserProfile;
  following_id: UserProfile;
  status: 'pending' | 'accepted';
  createdAt: string;
  updatedAt: string;
}


export interface FollowsResponse {
  message: string;
  followers?: UserProfile[];
  following?: UserProfile[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

export interface GetFollowsParams {
  page?: number;
  limit?: number;
}

export interface ManageFollowRequest {
  action: 'accept' | 'reject';
}

export const followUser = (userId: string) => {
  return usersClient.post<{ message: string }>(`/${userId}/follow`);
};

export const unfollowUser = (userId: string) => {
  return usersClient.delete<{ message: string }>(`/${userId}/follow`);
};

export const getFollowRequests = () => {
  return usersClient.get<FollowRequest[]>(`/requests`);
};

export const manageFollowRequest = (requesterId: string, data: ManageFollowRequest) => {
  return usersClient.post<{ message: string }>(`/requests/${requesterId}`, data);
};

export const getFollowers = (userId: string, params: GetFollowsParams) => {
  return usersClient.get<FollowsResponse>(`/${userId}/followers`, { params });
};

export const getFollowing = (userId: string, params: GetFollowsParams) => {
  return usersClient.get<FollowsResponse>(`/${userId}/following`, { params });
}; 