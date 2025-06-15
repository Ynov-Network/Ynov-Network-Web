import { useQuery } from "@tanstack/react-query";
import * as hashtagsApi from "./api";

export function useGetHashtags(params: hashtagsApi.GetHashtagsParams) {
  return useQuery({
    queryKey: ["hashtags", params],
    queryFn: () => hashtagsApi.getHashtags(params),
  });
}

export function useGetPostsByHashtag(tagName: string, params: hashtagsApi.GetPostsByHashtagParams) {
  return useQuery({
    queryKey: ["posts-by-hashtag", tagName, params],
    queryFn: () => hashtagsApi.getPostsByHashtag(tagName, params),
    enabled: !!tagName,
  });
} 