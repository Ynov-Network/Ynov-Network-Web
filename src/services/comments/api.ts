import { createServiceClient } from "@/lib/axios";
import type { UserProfile } from "../users/api";

const postsClient = createServiceClient("posts");
const commentsClient = createServiceClient("comments");

export interface Comment {
  _id: string;
  post_id: string;
  author_id: UserProfile;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PagedCommentsResponse {
  message: string;
  comments: Comment[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}

export interface CreateCommentRequest {
  content: string;
}

export const createComment = (postId: string, data: CreateCommentRequest) => {
  return postsClient.post<{ message: string, comment: Comment }>(`/${postId}/comments`, data);
};

export interface GetCommentsParams {
  page?: number;
  limit?: number;
}

export const getCommentsByPost = (postId: string, params: GetCommentsParams) => {
  return postsClient.get<PagedCommentsResponse>(`/${postId}/comments`, { params });
};

export interface UpdateCommentRequest {
  content: string;
}

export const updateComment = (commentId: string, data: UpdateCommentRequest) => {
  return commentsClient.put<{ message: string, comment: Comment }>(`/${commentId}`, data);
};

export const deleteComment = (commentId: string) => {
  return commentsClient.delete<{ message: string }>(`/${commentId}`);
}; 