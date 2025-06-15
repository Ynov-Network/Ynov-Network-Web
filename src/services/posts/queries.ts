import { useQuery } from "@tanstack/react-query";
import * as postsApi from "./api";

export function useGetPostById(postId: string) {
  return useQuery({
    queryKey: ["post", { postId }],
    queryFn: () => postsApi.getPostById(postId),
    enabled: !!postId,
  });
}

export function useGetPostsByUser(userId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["posts", "user", userId],
    queryFn: () => postsApi.getPostsByUser(userId),
    ...options,
  });
} 