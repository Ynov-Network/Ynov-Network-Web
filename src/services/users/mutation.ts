import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as usersApi from "./api";

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateUserProfile"],
    mutationFn: (data: usersApi.UpdateUserRequest) => usersApi.updateUserProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
}

export function useUpdateProfilePicture() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("image", file);
      return usersApi.updateProfilePicture(formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    },
  });
}

export function useUpdatePrivacySettings() {
  return useMutation({
    mutationKey: ["updatePrivacySettings"],
    mutationFn: (data: usersApi.UpdatePrivacySettingsRequest) => usersApi.updatePrivacySettings(data),
  });
}

export function useUpdateNotificationSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateNotificationSettings"],
    mutationFn: (data: usersApi.UpdateNotificationSettingsRequest) => usersApi.updateNotificationSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
}

export function useDeleteUser() {
  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (data: usersApi.DeleteUserRequest) => usersApi.deleteUser(data),
  });
} 