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
  return useMutation({
    mutationKey: ["updateProfilePicture"],
    mutationFn: (data: usersApi.UpdateProfilePictureRequest) => usersApi.updateProfilePicture(data),
  });
}

export function useUpdatePrivacySettings() {
  return useMutation({
    mutationKey: ["updatePrivacySettings"],
    mutationFn: (data: usersApi.UpdatePrivacySettingsRequest) => usersApi.updatePrivacySettings(data),
  });
}

export function useDeleteUser() {
  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (data: usersApi.DeleteUserRequest) => usersApi.deleteUser(data),
  });
} 