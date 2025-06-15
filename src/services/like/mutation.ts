import { useMutation } from "@tanstack/react-query";
import * as likeApi from "./api";

export function useToggleLike(postId: string) {
  return useMutation({
    mutationFn: () => likeApi.toggleLike(postId),
  });
} 