import { createServiceClient } from "@/lib/axios";
import type { UserProfile } from "../users/api";
import type { Media } from "../upload/api";

const postsClient = createServiceClient("posts");

export interface MediaItem {
  media_id: Media;
  display_order: number;
}

export interface Post {
  _id: string;
  author_id: UserProfile;
  content: string;
  visibility: 'public' | 'followers_only' | 'private';
  media_items: MediaItem[];
  hashtags: string[];
  like_count: number;
  comment_count: number;
  createdAt: string;
  updatedAt: string;
  is_liked: boolean;
  is_saved: boolean;
}

export interface PagedPostsResponse {
  posts: Post[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

export interface CreatePostRequest {
  content: string;
  visibility?: 'public' | 'followers_only' | 'private';
  media_items?: MediaItem[];
  hashtags?: string[];
}

export type UpdatePostRequest = Partial<CreatePostRequest>;

export const createPost = (data: CreatePostRequest) => {
  return postsClient.post<{ message: string, post: Post }>("/", data);
};

export const getPostById = (postId: string) => {
  return postsClient.get<Post>(`/${postId}`);
};

export const updatePost = (postId: string, data: UpdatePostRequest) => {
  return postsClient.put<{ message: string, post: Post }>(`/${postId}`, data);
};

export const deletePost = (postId: string) => {
  return postsClient.delete<{ message: string }>(`/${postId}`);
};

export const getPostsByUser = (userId: string) => {
  return postsClient.get<PagedPostsResponse>(`/user/${userId}`);
};