import { useQuery } from "@tanstack/react-query";
import * as savedPostsApi from "./api";

export function useGetSavedPosts(params: savedPostsApi.GetSavedPostsParams) {
  return useQuery({
    queryKey: ["saved-posts", params],
    queryFn: () => savedPostsApi.getSavedPosts(params),
  });
} 