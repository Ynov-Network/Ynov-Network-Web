import { useMutation } from "@tanstack/react-query";
import * as authApi from "./api";

export function useSignUp() {
  return useMutation({
    mutationKey: ["sign-up"],
    mutationFn: async (data: authApi.SignUpRequest) => await authApi.signUp(data),
  });
}

export function useSignIn() {
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async (data: authApi.SignInRequest) =>
      await authApi.signIn(data)
  });
}

export function useSignInSocial() {
  return useMutation({
    mutationKey: ["sign-in-social"],
    mutationFn: async (data: authApi.SignInSocialRequest) =>
      await authApi.signInSocial(data)
  });
}

export function useSignOut() {
  return useMutation({
    mutationKey: ["sign-out"],
    mutationFn: async () => await authApi.signOut()
  });
}
