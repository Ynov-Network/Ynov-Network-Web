import { useMutation } from "@tanstack/react-query";
import * as authApi from "./api";

export function useSignUp() {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: authApi.SignUpRequest) => await authApi.signUp(data),
  });
}

export function useSignIn() {
  return useMutation({
    mutationKey: ["login-user-verification"],
    mutationFn: async (data: authApi.SignInRequest) =>
      await authApi.signIn(data)
  });
}
