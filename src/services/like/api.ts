import { createServiceClient } from "@/lib/axios";
import type { UserProfile } from "../users/api";

const likesClient = createServiceClient("likes");

export interface ToggleLikeResponse {
  message: string;
  liked: boolean;
  postId: string;
}

export interface GetLikesResponse {
  message: string;
  likes: UserProfile[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

export interface GetLikesParams {
  page?: number;
  limit?: number;
}

export const toggleLike = (postId: string) => {
  return likesClient.post<ToggleLikeResponse>(`/${postId}/toggle`);
};

export const getLikesForPost = (postId: string, params: GetLikesParams) => {
  return likesClient.get<GetLikesResponse>(`/${postId}/users`, { params });
}; 