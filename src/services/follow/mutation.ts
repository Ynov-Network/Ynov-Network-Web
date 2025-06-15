import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as followApi from "./api";

export function useFollowUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => followApi.followUser(userId),
    onSuccess: (_data, userId) => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile", userId] });
      queryClient.invalidateQueries({ queryKey: ["followers", userId] });
      queryClient.invalidateQueries({ queryKey: ["following", userId] });
      queryClient.invalidateQueries({ queryKey: ["users", "suggestions"] });
      queryClient.invalidateQueries({ queryKey: ["userFeed"] });
      queryClient.invalidateQueries({ queryKey: ["publicFeed"] });
    },
  });
}

export function useUnfollowUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => followApi.unfollowUser(userId),
    onSuccess: (_data, userId) => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile", userId] });
      queryClient.invalidateQueries({ queryKey: ["followers", userId] });
      queryClient.invalidateQueries({ queryKey: ["following", userId] });
      queryClient.invalidateQueries({ queryKey: ["users", "suggestions"] });
      queryClient.invalidateQueries({ queryKey: ["userFeed"] });
      queryClient.invalidateQueries({ queryKey: ["publicFeed"] });
    },
  });
}

export function useManageFollowRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      requesterId,
      data,
    }: {
      requesterId: string;
      data: followApi.ManageFollowRequest;
    }) => followApi.manageFollowRequest(requesterId, data),
    onSuccess: (_data, { requesterId }) => {
      queryClient.invalidateQueries({ queryKey: ["followRequests"] });
      queryClient.invalidateQueries({ queryKey: ["followers", requesterId] });
    },
  });
} 