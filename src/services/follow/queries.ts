import { useQuery } from "@tanstack/react-query";
import * as followApi from "./api";

export function useGetFollowRequests() {
  return useQuery({
    queryKey: ["followRequests"],
    queryFn: followApi.getFollowRequests,
  });
}

export function useGetFollowers(userId: string, params: followApi.GetFollowsParams) {
  return useQuery({
    queryKey: ["followers", userId, params],
    queryFn: () => followApi.getFollowers(userId, params),
    enabled: !!userId,
  });
}

export function useGetFollowing(userId: string, params: followApi.GetFollowsParams) {
  return useQuery({
    queryKey: ["following", userId, params],
    queryFn: () => followApi.getFollowing(userId, params),
    enabled: !!userId,
  });
} 