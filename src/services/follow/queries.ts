import { useQuery } from "@tanstack/react-query";
import * as followApi from "./api";

export function useGetFollowRequests() {
  return useQuery({
    queryKey: ["follow-requests"],
    queryFn: followApi.getFollowRequests,
  });
}

export function useGetFollowers(userId: string, params: followApi.GetFollowsParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["followers", userId, params],
    queryFn: () => followApi.getFollowers(userId, params),
    enabled: !!userId && (options?.enabled ?? true),
  });
}

export function useGetFollowing(userId: string, params: followApi.GetFollowsParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["following", userId, params],
    queryFn: () => followApi.getFollowing(userId, params),
    enabled: !!userId && (options?.enabled ?? true),
  });
} 