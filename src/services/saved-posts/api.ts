import { createServiceClient } from "@/lib/axios";
import type { Post } from "../posts/api";

const postsClient = createServiceClient("posts");
const meClient = createServiceClient("me");

export interface ToggleSavePostResponse {
  message: string;
  saved: boolean;
}

export interface GetSavedPostsParams {
  page?: number;
  limit?: number;
  q?: string;
}

export interface GetSavedPostsResponse {
  message: string;
  posts: Post[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

export const toggleSavePost = (postId: string) => {
  return postsClient.post<ToggleSavePostResponse>(`/${postId}/save`);
};

export const getSavedPosts = (params: GetSavedPostsParams) => {
  return meClient.get<GetSavedPostsResponse>("/saved-posts", { params });
}; 