import { createServiceClient } from "@/lib/axios";

const authClient = createServiceClient("auth", {
  withCredentials: true
});

export interface SignUpRequest {
  first_name: string;
  last_name: string;
  username: string;
  university_email: string;
  password: string;
}
const signUp = async (data: SignUpRequest) => {
  return await authClient.post<SignUpRequest>("/sign-up", data);
};

export interface SignInRequest {
  university_email: string;
  password: string;
}

const signIn = async (data: SignInRequest) => {
  return await authClient.post<SignInRequest>("/sign-in", data);
};

export interface SignInSocialRequest {
  provider: string;
  callbackURL: string;
}

const signInSocial = async (data: SignInSocialRequest) => {
  return await authClient.post<SignInSocialRequest>("/sign-in/social", data);
};

const signOut = async () => {
  return await authClient.post("/sign-out");
};

export {
  signUp,
  signIn,
  signInSocial,
  signOut
};
