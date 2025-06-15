import { useQuery } from "@tanstack/react-query";
import * as likeApi from "./api";

export function useGetLikesForPost(postId: string, params: likeApi.GetLikesParams) {
  return useQuery({
    queryKey: ["likes", postId, params],
    queryFn: () => likeApi.getLikesForPost(postId, params),
  });
} 