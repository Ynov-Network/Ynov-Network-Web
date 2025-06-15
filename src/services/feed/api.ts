import { createServiceClient } from "@/lib/axios";
import type { Post } from "../posts/api";

const feedClient = createServiceClient("feed");

export interface GetFeedParams {
  page?: number;
  limit?: number;
  feedType?: 'trending' | 'for_you';
}

export interface FeedResponse {
  message: string;
  posts: Post[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

export const getUserFeed = (params: GetFeedParams) => {
  return feedClient.get<FeedResponse>("/personal", { params });
};

export const getPublicFeed = (params: GetFeedParams) => {
  return feedClient.get<FeedResponse>("/public", { params });
}; 