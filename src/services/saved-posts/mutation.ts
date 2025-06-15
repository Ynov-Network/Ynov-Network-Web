import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as savedPostsApi from "./api";

export function useToggleSavePost(postId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => savedPostsApi.toggleSavePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
    },
  });
} 