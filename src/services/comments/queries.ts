import { useQuery } from "@tanstack/react-query";
import * as commentsApi from "./api";

export function useGetCommentsByPost(postId: string, params: commentsApi.GetCommentsParams) {
  return useQuery({
    queryKey: ["comments", postId, params],
    queryFn: () => commentsApi.getCommentsByPost(postId, params),
    enabled: !!postId,
  });
} 