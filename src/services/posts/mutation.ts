import { useMutation } from "@tanstack/react-query";
import * as postsApi from "./api";

export function useCreatePost() {
  return useMutation({
    mutationFn: (data: postsApi.CreatePostRequest) => postsApi.createPost(data),
  });
}

export function useUpdatePost(postId: string) {
  return useMutation({
    mutationFn: (data: postsApi.UpdatePostRequest) => postsApi.updatePost(postId, data),
  });
}

export function useDeletePost(postId: string) {
  return useMutation({
    mutationFn: () => postsApi.deletePost(postId),
  });
} 