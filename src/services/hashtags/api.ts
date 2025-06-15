import { createServiceClient } from "@/lib/axios";
import type { Post } from "../posts/api";

const hashtagsClient = createServiceClient("hashtags");

export interface Hashtag {
  _id: string;
  tag_name: string;
  post_count: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetHashtagsParams {
  page?: number;
  limit?: number;
  sortBy?: 'popular' | 'recent';
}

export interface GetPostsByHashtagParams {
  page?: number;
  limit?: number;
}

export interface HashtagsResponse {
  message: string;
  hashtags: Hashtag[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

export interface PostsByHashtagResponse {
  message: string;
  posts: Post[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

export const getHashtags = (params: GetHashtagsParams) => {
  return hashtagsClient.get<HashtagsResponse>("/", { params });
};

export const getPostsByHashtag = (tagName: string, params: GetPostsByHashtagParams) => {
  return hashtagsClient.get<PostsByHashtagResponse>(`/${tagName}`, { params });
}; 