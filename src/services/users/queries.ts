import { useQuery } from "@tanstack/react-query";
import * as usersApi from "./api";

export function useGetMyProfile() {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: usersApi.getMyProfile,
  });
}

export function useGetSuggestedUsers() {
  return useQuery({
    queryKey: ['users', 'suggestions'],
    queryFn: usersApi.getSuggestedUsers,
  });
}

export function useGetUserProfile(userId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => usersApi.getUserProfile(userId),
    ...options,
  });
} 